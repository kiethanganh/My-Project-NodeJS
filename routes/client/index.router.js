const productRoute = require("./products.router");
const homeRoute = require("./home.router");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const userRoute = require("./user.router")
const userMiddleware = require("../../middlewares/client/user.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const cartRouter = require("./cart.router")
const checkoutRouter = require("./checkout.router")
const searchRouter = require("./search.router")

module.exports = (app) => {

    app.use(categoryMiddleware.category);

    app.use(userMiddleware.infoUser)

    app.use(cartMiddleware.cartId)

    app.use('/', homeRoute);

    app.use('/products', productRoute);

    app.use('/user', userRoute);

    app.use('/cart', cartRouter);

    app.use('/checkout', checkoutRouter);

    app.use('/search', searchRouter);
   
}