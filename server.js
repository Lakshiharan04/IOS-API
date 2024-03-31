// app.js or index.js

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoutes.js');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://lakshiharanlksh:dS7R6ZbWamtZMCCo@clothingapp.p9zjlgo.mongodb.net/clothingApp?retryWrites=true&w=majority&appName=ClothingApp', {}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Middleware
app.use(express.json());


app.use('/images', express.static('images'));

// Routes
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);
app.use('/products', productRoutes);
app.use('/getid', productRoutes);
app.use('/cart',cartRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});