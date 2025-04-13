const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');
const app = express();
const port = 3000;

// Налаштування CORS
app.use(cors());

// Налаштування Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Налаштування статичних файлів
app.use(express.static('public'));

// Дані користувачів
const users = [
    { name: 'Олег', age: 25, email: 'oleg@example.com' },
    { name: 'Марія', age: 30, email: 'maria@example.com' },
    { name: 'Іван', age: 22, email: 'ivan@example.com' }
];

// API-ендпоінт
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Nunjucks-шаблон
app.get('/', (req, res) => {
    res.render('users.njk', { users });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Бекенд запущено на http://localhost:${port}`);
});