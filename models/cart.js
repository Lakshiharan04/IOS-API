const { text } = require('express');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
                required: true
            }
        }],
        created_date: {
            type: Date,
            default: Date.now
        }
    });

    
    module.exports = mongoose.model('Cart', cartSchema);