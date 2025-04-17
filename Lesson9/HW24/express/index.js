import express from "express";
import createProxyMiddleware from "http-proxy-middleware";

const servers = [
  "http://localhost:4001",
  "http://localhost:4002",
  "http://localhost:4003",
];

let currentServerIndex = 0;

const app = express();

app.use((req, res, next) => {
  const target = servers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % servers.length;

  createProxyMiddleware({ target, changeOrigin: true })(req, res, next);
});

app.listen(4000, () => {
  console.log("Load balancer is running on http://localhost:4000");
});

for (let i = 0; i < servers.length; i++) {
  const server = servers[i];
  express()
    .use((req, res) => {
      res.status(200).send(`Response from server ${i + 1}`);
    })
    .listen(server.split(":")[2], () => {
      console.log(`Server ${i + 1} is running on ${server}`);
    });
}
