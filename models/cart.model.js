const mongoose = require('mongoose');

const cart = new mongoose.Schema({
        user_id: String,
        products: [
            {
                product_id: String,
                quantity: Number
            }
        ]
    },
    {
        timestamps: true
    });

const Cart = mongoose.model("Cart", cart, "carts");
module.exports = Cart;