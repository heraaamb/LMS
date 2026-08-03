import pg from 'pg';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

const { Pool } = pg;

// Initialize PostgreSQL Connection Pool
const poolConfig = env.db.connectionString
  ? { connectionString: env.db.connectionString }
  : {
      host: env.db.host,
      port: env.db.port,
      database: env.db.name,
      user: env.db.user,
      password: env.db.password,
      max: 20, // Max clients in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };

export const pool = new Pool(poolConfig);

// Pool error handling
pool.on('error', (err) => {
  logger.error('Unexpected error on idle PostgreSQL client:', err.message);
});

export const db = {
  /**
   * Execute a single parameterized SQL query
   * @param {string} text - SQL query string
   * @param {Array} params - Parameterized values array
   */
  query: async (text, params = []) => {
    const start = Date.now();
    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      logger.info(`DB Query executed in ${duration}ms: [${res.rowCount} rows returned]`);
      return res;
    } catch (error) {
      logger.error(`DB Query failed: ${error.message} -- Query: ${text}`);
      throw error;
    }
  },

  /**
   * Acquire a dedicated client from the pool for SQL Transactions
   */
  getClient: async () => {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);

    // Timeout release guard
    const timeout = setTimeout(() => {
      logger.warn('A PostgreSQL client has been checked out for more than 10 seconds.');
    }, 10000);

    client.release = () => {
      clearTimeout(timeout);
      client.query = query;
      client.release = release;
      return release();
    };

    return client;
  },

  /**
   * Test PostgreSQL Database Connection Health
   */
  connect: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT NOW(), current_database(), current_user');
      client.release();
      const { now, current_database, current_user } = result.rows[0];
      logger.info(`Successfully connected to PostgreSQL database "${current_database}" as user "${current_user}" at ${now}`);
      return true;
    } catch (error) {
      logger.error(`Failed to connect to PostgreSQL database: ${error.message}`);
      logger.warn('Please ensure PostgreSQL service is running and database exists with your .env credentials.');
      return false;
    }
  },
};
