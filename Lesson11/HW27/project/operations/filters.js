const connectDB = require("../config/db");

async function filterAndSort() {
  const db = await connectDB();
  const collection = db.collection("students");

  try {
    const olderThan20 = await collection.find({ age: { $gt: 20 } }).toArray();
    console.log("Students older than 20:", olderThan20);

    const highMarks = await collection
      .find({ marks: { $elemMatch: { $gt: 85 } } })
      .toArray();
    console.log("Students with marks > 85:", highMarks);

    const nameStartsWithA = await collection
      .find({ name: { $regex: "^A", $options: "i" } })
      .toArray();
    console.log("Students with name starting with A:", nameStartsWithA);

    const sortedByAge = await collection.find().sort({ age: -1 }).toArray();
    console.log("Students sorted by age (descending):", sortedByAge);
  } catch (error) {
    console.error("Error in filter and sort:", error);
  }
}

module.exports = filterAndSort;
