import express from "express";

const app = express();
const port = 3000;

const products = [
  { name: "Ноутбук", price: 25000, inStock: true },
  { name: "Смартфон", price: 15000, inStock: false },
  { name: "Навушники", price: 2000, inStock: true },
  { name: "Планшет", price: 18000, inStock: false },
];

app.set("view engine", "pug");

app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { products });
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
