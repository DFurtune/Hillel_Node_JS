// Основний файл сервера (Node.js, Express)
import express from 'express';
import bodyParser from 'body-parser';
import studentsRoutes from './routes/students.js';
import coursesRoutes from './routes/courses.js';
import enrollmentsRoutes from './routes/enrollments.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/students', studentsRoutes);
app.use('/courses', coursesRoutes);
app.use('/enrollments', enrollmentsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});