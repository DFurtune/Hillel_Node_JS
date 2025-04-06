const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../logs/app.log");
const LOG_LEVELS = {
  INFO: "INFO",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
};

function writeLog(level, message) {
  const now = new Date().toISOString();
  const logMessage = `[${now}] [${level}] ${message}\n`;

  fs.appendFile(LOG_FILE, logMessage, (err) => {
    if (err) {
      console.error("Помилка запису логів:", err);
    }
  });

  console.log(logMessage.trim());
}

function logRequest(req) {
  const now = new Date().toISOString();
  const message = `${req.method} ${req.url}`;
  writeLog(LOG_LEVELS.INFO, message);
}

function logResponse(req, res, duration) {
  const message = `Response: ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`;
  writeLog(LOG_LEVELS.INFO, message);
}

function logError(err) {
  const message = `Error: ${err.message}`;
  writeLog(LOG_LEVELS.ERROR, message);
}

module.exports = {
  logRequest,
  logResponse,
  logError,
  LOG_LEVELS,
};
