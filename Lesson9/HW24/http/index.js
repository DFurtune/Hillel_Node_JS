import http from "http";
import httpProxy from "http-proxy";

const createProxyServer = httpProxy.createProxyServer;

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

let currentServerIndex = 0;

const proxy = createProxyServer();

const loadBalancer = http.createServer((req, res) => {
  // Round-robin load balancing
  const target = servers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % servers.length;

  proxy.web(req, res, { target }, (error) => {
    console.error(`Error proxying request to ${target}:`, error);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway");
  });
});

loadBalancer.listen(3000, () => {
  console.log("Load balancer is running on http://localhost:3000");
});

for (let i = 0; i < servers.length; i++) {
  const server = servers[i];
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Response from server ${i + 1}`);
    })
    .listen(server.split(":")[2], () => {
      console.log(`Server ${i + 1} is running on ${server}`);
    });
}
