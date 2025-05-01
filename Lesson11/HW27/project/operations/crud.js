const connectDB = require("../config/db");
const studentsData = require("../data/students.json");

async function crudOperations() {
  const db = await connectDB();
  const collection = db.collection("students");

  try {
    await collection.deleteMany({});
    await collection.insertMany(studentsData);
    console.log("Inserted 5 students");

    const allStudents = await collection.find({}).toArray();
    console.log("All students:", allStudents);

    await collection.updateOne({ name: "Ivan" }, { $set: { age: 22 } });
    console.log("Updated Ivan's age");

    await collection.deleteOne({ group: "A-31" });
    console.log("Deleted one student from group A-31");
  } catch (error) {
    console.error("Error in CRUD operations:", error);
  }
}

module.exports = crudOperations;
