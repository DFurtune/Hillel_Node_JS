const connectDB = require("../config/db");

async function aggregationOperations() {
  const db = await connectDB();
  const collection = db.collection("students");

  try {
    const avgMarks = await collection
      .aggregate([
        {
          $project: {
            name: 1,
            averageMark: { $avg: "$marks" },
            _id: 0,
          },
        },
      ])
      .toArray();
    console.log("Average marks per student:", avgMarks);

    const groupCount = await collection
      .aggregate([
        {
          $group: {
            _id: "$group",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();
    console.log("Students per group:", groupCount);

    const totalAvg = await collection
      .aggregate([
        { $unwind: "$marks" },
        {
          $group: {
            _id: null,
            totalAverage: { $avg: "$marks" },
          },
        },
      ])
      .toArray();
    console.log("Total average mark:", totalAvg);
  } catch (error) {
    console.error("Error in aggregation:", error);
  }
}

module.exports = aggregationOperations;
