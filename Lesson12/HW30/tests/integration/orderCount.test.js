const request = require('supertest');
const app = require('../../app');
const { sequelize, User, Order } = require('../../db');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await User.destroy({ where: {} });
  await Order.destroy({ where: {} });
});

describe('GET /users/:id/orders/count', () => {
  it('should return correct order count', async () => {
    const user = await User.create({ name: 'John', email: 'john@example.com' });
    await Order.create({ userId: user.id });
    await Order.create({ userId: user.id });

    const res = await request(app).get(`/users/${user.id}/orders/count`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('count', 2);
  });

  it('should return 0 if no orders', async () => {
    const user = await User.create({ name: 'John', email: 'john@example.com' });

    const res = await request(app).get(`/users/${user.id}/orders/count`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('count', 0);
  });

  it('should return 404 if user does not exist', async () => {
    const res = await request(app).get('/users/999/orders/count');
    expect(res.status).toBe(404);
  });
});