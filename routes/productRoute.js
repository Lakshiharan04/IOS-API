const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to insert a product with image upload
router.post('/', async (req, res) => {
    try {
        // Extract other fields from req.body
        const { productName, price, size, imageUrl,  categoryId } = req.body;

        // Check if image file is provided
       

        // Create the product in the database with the image URL
        const product = await Product.create({
            productName,
            price,
            size,
            imageUrl,
            categoryId
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/get', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categoryId', 'categoryName')
            .select('productName price size imageUrl');

        const productsWithDetails = products.map(product => {
            return {
                _id: product._id, // Include product ID
                productName: product.productName,
                categoryName: product.categoryId.categoryName,
                price: product.price,
                size: product.size,
                imageUrl: product.imageUrl
            };
        });

        res.json(productsWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId)
            .populate('categoryId', 'categoryName')
            .select('productName price size imageUrl');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productDetails = {
            _id: product._id,
            productName: product.productName,
            categoryName: product.categoryId.categoryName,
            price: product.price,
            size: product.size,
            imageUrl: product.imageUrl
        };

        res.json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;