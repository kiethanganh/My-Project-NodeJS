const systemConfig = require("../../config/system")
const dashboardRoute = require("./dashboard.router");
const productsRoute = require("./products.router");
const productsCategoryRoute = require("./products.category");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const accountclientRouter = require("./accountclient.router");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoute);

    app.use(PATH_ADMIN + "/products", productsRoute);

    app.use(PATH_ADMIN + "/products-category", productsCategoryRoute);

    app.use(PATH_ADMIN + "/accounts", accountRouter);

    app.use(PATH_ADMIN + "/auth", authRouter);

    app.use(PATH_ADMIN + "/accounts-clients", accountclientRouter);
}