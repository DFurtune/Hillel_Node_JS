import express from "express";
const app = express();
const port = 3000;

const users = [
  { name: "Олег", age: 25, email: "oleg@example.com" },
  { name: "Марія", age: 30, email: "maria@example.com" },
  { name: "Іван", age: 22, email: "ivan@example.com" },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
  let tableRows = "";
  users.forEach((user) => {
    tableRows += `<tr><td>${user.name}</td><td>${user.age}</td><td>${user.email}</td></tr>`;
  });

  const html = `
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Таблиця користувачів</title>
            <link rel="stylesheet" href="./style.css">
        </head>
        <body>
            <h1>Список користувачів</h1>
            <table>
                <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Вік</th>
                        <th>Електронна пошта</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </body>
        </html>
    `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
