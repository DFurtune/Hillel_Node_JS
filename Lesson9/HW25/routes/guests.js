import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Guests (first_name, last_name, email, phone, created_at) VALUES (?, ?, ?, ?, NOW())',
      [first_name, last_name, email, phone]
    );
    res.status(201).json({ message: 'Guest added successfully', guestId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;