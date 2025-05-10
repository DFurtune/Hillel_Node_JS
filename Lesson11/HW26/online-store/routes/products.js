const express = require("express");
const router = express.Router();
const connectToDatabase = require("../db");

// Get all smartphones
router.get("/smartphones", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const smartphones = await db.collection("products").aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $match: { "category.name": "Smartphones" },
      },
      {
        $project: { name: 1, price: 1, stock: 1 },
      },
    ]).toArray();
    res.json(smartphones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;