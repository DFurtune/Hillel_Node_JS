const userService = require('../services/userService');

class ExampleController {
    async getExample(req, res) {
        try {
            // Logic to get example data
            res.status(200).json({ message: "Example data retrieved successfully." });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while retrieving example data." });
        }
    }

    async postExample(req, res) {
        try {
            // Logic to save example data
            res.status(201).json({ message: "Example data saved successfully." });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while saving example data." });
        }
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).send({ error: 'User not found' });
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

async function countUserOrders(req, res) {
    try {
        const count = await userService.countUserOrders(req.params.id);
        res.status(200).send({ count });
    } catch (err) {
        if (err.message === 'User not found') return res.status(404).send({ error: err.message });
        res.status(500).send({ error: err.message });
    }
}

module.exports = { ExampleController, getUserById, createUser, countUserOrders };