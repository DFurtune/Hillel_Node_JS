import express from "express";
const app = express();
const port = 3000;

const users = [
  { name: "Олег", age: 25, email: "oleg@example.com" },
  { name: "Марія", age: 30, email: "maria@example.com" },
  { name: "Іван", age: 22, email: "ivan@example.com" },
];

app.set("view engine", "pug");

app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
