import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Визначаємо URL залежно від середовища
  const apiUrl = process.env.NODE_ENV === 'development' && !window.location.hostname.includes('backend')
    ? 'http://localhost:3000/api/users'
    : 'http://backend:3000/api/users';

  useEffect(() => {
    const fetchUsers = async () => {
      let retries = 5;
      while (retries > 0) {
        console.log(`Спроба ${6 - retries}: Запит до ${apiUrl}`);
        try {
          const response = await fetch(apiUrl);
          console.log('Статус відповіді:', response.status);
          if (!response.ok) {
            throw new Error('Не вдалося отримати дані');
          }
          const data = await response.json();
          setUsers(data);
          return;
        } catch (err) {
          console.error('Помилка:', err.message);
          retries--;
          if (retries === 0) {
            setError(err.message);
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <div className="App">
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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;