const db = require('../db');
const { Order, User } = db;

async function getUserById(id) {
  return await User.findByPk(id);
}

async function createUser(data) {
  return await User.create(data);
}

async function countUserOrders(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  return await Order.count({ where: { userId } });
}

module.exports = { getUserById, createUser, countUserOrders };