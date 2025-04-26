import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.get("/available", async (req, res) => {
  const { date } = req.query;
  try {
    const [rooms] = await db.query(
      `SELECT r.id, r.room_number, r.room_type, r.price_per_night
       FROM Rooms r
       WHERE r.is_active = 1
         AND r.id NOT IN (
           SELECT b.room_id
           FROM Bookings b
           WHERE ? BETWEEN b.check_in_date AND b.check_out_date
         )`,
      [date]
    );
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
