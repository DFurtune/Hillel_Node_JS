const request = require('supertest');
const app = require('../../app');
const { sequelize, User } = require('../../db');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

describe('POST /users', () => {
  it('should create a user and return 201', async () => {
    const res = await request(app).post('/users').send({ name: 'John', email: 'john@example.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'John');
    expect(res.body).toHaveProperty('email', 'john@example.com');

    const user = await User.findByPk(res.body.id);
    expect(user).not.toBeNull();
  });
});