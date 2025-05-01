const crudOperations = require("./operations/crud");
const filterAndSort = require("./operations/filters");
const aggregationOperations = require("./operations/aggregation");

async function main() {
  console.log("Starting CRUD operations...");
  await crudOperations();

  console.log("\nStarting filter and sort operations...");
  await filterAndSort();

  console.log("\nStarting aggregation operations...");
  await aggregationOperations();

  process.exit(0);
}

main().catch(console.error);
