import Logger from "./logger/logger.js";

const logger = new Logger();

//Test 1
try {
  throw new Error("Test exceotion");
} catch (error) {
  logger.exception(error);
}

//Test 2
logger.exception("Not an error obj");

//Test 3
logger.info("Test info message");

//Test 4
logger.warning("Test warning message");

//Test 5
logger.error("Test error message");
