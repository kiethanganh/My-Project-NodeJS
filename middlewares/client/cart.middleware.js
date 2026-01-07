const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    let cart;

    if (!req.cookies.cartId) {
        cart = new Cart();
        await cart.save();

        const setTime = 1000 * 60 * 60 * 24 * 365;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + setTime)
        });
    } else {
        cart = await Cart.findOne({
            _id: req.cookies.cartId
        });
    }

    const totalQuantity = cart.products.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    res.locals.miniCart = {
        totalQuantity
    };

    next();
};
