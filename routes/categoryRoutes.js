// categoryRoutes.js

const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Route to insert a category
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;