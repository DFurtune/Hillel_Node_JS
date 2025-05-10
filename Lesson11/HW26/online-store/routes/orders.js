const express = require("express");
const router = express.Router();
const connectToDatabase = require("../db");

// Get total profit
router.get("/profit", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const totalProfit = await db.collection("orders").aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
        },
      },
    ]).toArray();
    res.json({ totalProfit: totalProfit[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update stock after an order
router.post("/update-stock", async (req, res) => {
  const { orderItems } = req.body;
  try {
    const db = await connectToDatabase();
    for (const item of orderItems) {
      await db.collection("products").updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }
    res.json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;