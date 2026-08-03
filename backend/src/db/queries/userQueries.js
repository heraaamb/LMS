export const userQueries = {
  findUserByIdentifier: `
    SELECT * FROM users 
    WHERE LOWER(email) = LOWER($1) 
       OR LOWER(student_id) = LOWER($1) 
       OR LOWER(teacher_id) = LOWER($1)
    LIMIT 1;
  `,
  findUserById: `SELECT * FROM users WHERE id = $1;`,
  createUser: `
    INSERT INTO users (id, name, email, password_hash, role, student_id, teacher_id, department, academic_year, phone, avatar)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id, name, email, role, student_id, teacher_id, department, status;
  `,
  getAllStudents: `SELECT id, name, email, student_id, department, academic_year, phone, status, active_issues_count FROM users WHERE role = 'student';`,
};
