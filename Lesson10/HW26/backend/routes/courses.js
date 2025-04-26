import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all courses');
});

router.post('/', (req, res) => {
  res.send('Add a new course');
});

router.get('/student-count', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.title, COUNT(e.student_id) AS student_count
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.title;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/high-average', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.title
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.title
      HAVING AVG(e.grade) > 85;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;