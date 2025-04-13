import express from "express";
import nunjuks from "nunjucks";
const app = express();
const PORT = 3000;

nunjuks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("public"));

const users = [
  { name: "Олег", age: 25, email: "oleg@example.com" },
  { name: "Марія", age: 30, email: "maria@example.com" },
  { name: "Іван", age: 22, email: "ivan@example.com" },
];

app.get("/", (req, res) => {
  res.render("users.njk", { users });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
