const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
        productName:{
            type: String,
            required: true,
            trim: true,
        },
    
        productPrice:{
            type: Number,
            required: true,
        },

        productDescription:{
            type: String,
            required: true,
            trim: true,
        },

        productCategory:{
            type: String,
            required: true,
            trim: true,
        },
    
        productImageUrl:{
            type: String,
            required: true,
            trim: true,
        },
    
    });

const Product = mongoose.model("products", productSchema);
module.exports = Product;