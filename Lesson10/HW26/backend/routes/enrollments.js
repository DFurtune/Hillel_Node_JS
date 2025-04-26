import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all enrollments');
});

router.post('/', (req, res) => {
  res.send('Add a new enrollment');
});

export default router;