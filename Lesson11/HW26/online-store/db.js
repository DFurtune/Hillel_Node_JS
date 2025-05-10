const { MongoClient } = require("mongodb");

const uri = "mongodb://admin:secret@localhost:27017/store?authSource=admin";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDatabase() {
  if (!client.isConnected) {
    await client.connect();
  }
  return client.db("store");
}

module.exports = connectToDatabase;