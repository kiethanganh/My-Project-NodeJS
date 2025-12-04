const productRoute = require("./products.router");
const homeRoute = require("./home.router");

module.exports = (app) => {
    app.use('/', homeRoute);

    app.use('/products', productRoute);
   
}