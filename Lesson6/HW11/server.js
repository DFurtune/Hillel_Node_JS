const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (url === "/") {
    res.statusCode = 200;
    res.end("<h1>Welcome to the home page!</h1>");
  } else if (url === "/about") {
    res.statusCode = 200;
    res.end("<h1>About us</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
