import cluster from "cluster";
import os from "os";
import express from "express";
import nunjucks from "nunjucks";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const PORT = 3000;

  app.use(express.static("public"));

  nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });

  const users = [
    { name: "Олег", age: 25, email: "oleg@example.com" },
    { name: "Марія", age: 30, email: "maria@example.com" },
    { name: "Іван", age: 22, email: "ivan@example.com" },
  ];

  app.get("/api/users", (req, res) => {
    res.json(users);
  });

  app.get("/", (req, res) => {
    res.render("users.njk", { users });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
