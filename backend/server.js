import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './src/routes/index.js';
import { db } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorMiddleware.js';
import { logger } from './src/utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Health check route
app.get('/health', async (req, res) => {
  const dbConnected = await db.connect();
  res.status(dbConnected ? 200 : 500).json({
    status: dbConnected ? 'success' : 'degraded',
    message: 'Athena Library OS Backend API Server',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Mount Main API Router
app.use('/api', apiRouter);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start HTTP Server and test Database connection
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  logger.info(`Health check endpoint: http://localhost:${PORT}/health`);
  
  // Test PostgreSQL DB connection on startup
  await db.connect();
});
