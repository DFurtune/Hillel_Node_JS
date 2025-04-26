import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { guest_id, room_id, check_in_date, check_out_date, total_price } =
    req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date, total_price, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [guest_id, room_id, check_in_date, check_out_date, total_price]
    );
    res
      .status(201)
      .json({
        message: "Booking created successfully",
        bookingId: result.insertId,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/revenue", async (req, res) => {
  const { month, year } = req.query;
  try {
    const [result] = await db.query(
      `SELECT SUM(total_price) AS total_revenue
       FROM Bookings
       WHERE MONTH(check_in_date) = ? AND YEAR(check_in_date) = ?`,
      [month, year]
    );
    res.status(200).json({ total_revenue: result[0].total_revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
