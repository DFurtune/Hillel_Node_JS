const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { User } = require('../models/user');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany(); // Очистити колекцію після кожного тесту
});

describe('E2E Login Scenario', () => {
  test('creates a user, logs in, and accesses a protected resource', async () => {
    // 1. Створення користувача
    const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
    const createUserResponse = await request(app).post('/users').send(userData);

    expect(createUserResponse.status).toBe(201);
    expect(createUserResponse.body).toHaveProperty('id');
    expect(createUserResponse.body).toHaveProperty('name', userData.name);
    expect(createUserResponse.body).toHaveProperty('email', userData.email);

    // 2. Вхід з правильними даними
    const loginResponse = await request(app).post('/login').send({
      email: userData.email,
      password: userData.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
    const token = loginResponse.body.token;

    // 3. Доступ до захищеного ресурсу з токеном
    const protectedResponse = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(protectedResponse.status).toBe(200);
    expect(protectedResponse.body).toHaveProperty('message', 'Access granted');
    expect(protectedResponse.body).toHaveProperty('userId');

    // 4. Доступ до захищеного ресурсу без токена
    const noTokenResponse = await request(app).get('/protected');

    expect(noTokenResponse.status).toBe(401);
    expect(noTokenResponse.body).toHaveProperty('error', 'No token provided');
  });
});