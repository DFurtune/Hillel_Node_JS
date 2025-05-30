const express = require('express');
const MainController = require('../controllers/mainController');

const router = express.Router();
const mainController = new MainController();

router.get('/', mainController.renderIndex.bind(mainController));

module.exports = router;