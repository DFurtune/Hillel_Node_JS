const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.get('/:id/orders/count', userController.countUserOrders);

module.exports = userRouter;