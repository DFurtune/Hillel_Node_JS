const { DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Назва таблиці користувачів
      key: 'id',
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending', // Можливі значення: pending, completed, canceled
  },
}, {
  tableName: 'orders',
  timestamps: true, // Додає createdAt і updatedAt
});

module.exports = Order;