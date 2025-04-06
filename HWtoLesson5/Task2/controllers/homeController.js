const parseBody = require("../utils/parseBody");
const renderHTML = require("../utils/renderHTML");
const { logError } = require("../utils/logger");

exports.home = (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Головна сторінка");
  } catch (error) {
    logError(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Помилка на головній сторінці");
  }
};

exports.about = (req, res) => {
  try {
    renderHTML(res, "about.html");
  } catch (error) {
    logError(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Помилка на сторінці Про нас");
  }
};

exports.submit = async (req, res) => {
  try {
    const body = await parseBody(req);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Форма прийнята", data: body }));
  } catch (error) {
    logError(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Помилка при обробці форми");
  }
};
