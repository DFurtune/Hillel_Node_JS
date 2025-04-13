import express from "express";

const app = express();
const port = 3000;

const products = [
  { name: "Ноутбук", price: 25000, inStock: true },
  { name: "Смартфон", price: 15000, inStock: false },
  { name: "Навушники", price: 2000, inStock: true },
  { name: "Планшет", price: 18000, inStock: false },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
  let productList = "";
  products.forEach((product) => {
    const color = product.inStock ? "green" : "red";
    productList += `<li style="color: ${color};">
                ${product.name} - ${product.price} грн 
                (${product.inStock ? "В наявності" : "Немає в наявності"})
            </li>`;
  });

  const html = `
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Список продуктів</title>
            <link rel="stylesheet" href="./public/styles.css">
        </head>
        <body>
            <h1>Магазин продуктів</h1>
            <ul>
                ${productList}
            </ul>
        </body>
        </html>
    `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
