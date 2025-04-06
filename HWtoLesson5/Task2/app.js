const http = require("http");
const url = require("url");
const loadEnv = require("./utils/loadEnv");
const { logRequest, logResponse, logError } = require("./utils/logger");
const routes = require("./routes");
const { log } = require("console");

// Завантажити .env
loadEnv();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const startTime = Date.now();

  const parsedUrl = url.parse(req.url, true);
  req.pathname = parsedUrl.pathname;
  req.query = parsedUrl.query;

  logRequest(req);

  try {
    for (const route of routes) {
      const match = route.match(req.method, req.pathname);
      if (match) {
        req.params = match.params;

        await route.handler(req, res);

        const duration = Date.now() - startTime;
        logResponse(req, res, duration);
        return;
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    const duration = Date.now() - startTime;
    logResponse(req, res, duration);
  } catch (error) {
    logError(error);

    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`🚀 ${process.env.APP_NAME} слухає порт ${PORT}`);
});
