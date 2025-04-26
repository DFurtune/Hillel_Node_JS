import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all students');
});

router.post('/', (req, res) => {
  res.send('Add a new student');
});

router.get('/average-grades', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.name, AVG(e.grade) AS average_grade
      FROM students s
      JOIN enrollments e ON s.id = e.student_id
      GROUP BY s.name;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/sql-basics', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.name
      FROM students s
      JOIN enrollments e ON s.id = e.student_id
      JOIN courses c ON e.course_id = c.id
      WHERE c.title = 'SQL Basics';
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/top-student', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.name, AVG(e.grade) AS average_grade
      FROM students s
      JOIN enrollments e ON s.id = e.student_id
      GROUP BY s.name
      ORDER BY average_grade DESC
      LIMIT 1;
    `);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;