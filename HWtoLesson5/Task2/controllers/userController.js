const parseBody = require("../utils/parseBody");
const { logError } = require("../utils/logger");

exports.getUser = (req, res) => {
  try {
    const { id } = req.params;
    const { debug } = req.query;

    const response = {
      message: `Користувач з ID: ${id}`,
      debug: debug === "true" ? "Детальний режим" : undefined,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } catch (error) {
    logError(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Помилка при отриманні користувача");
  }
};

exports.createUser = async (req, res) => {
  try {
    const body = await parseBody(req);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Користувача створено", data: body }));
  } catch (error) {
    logError(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Помилка при створенні користувача");
  }
};
