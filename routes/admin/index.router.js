const systemConfig = require("../../config/system")
const dashboardRoute = require("./dashboard.router");
const productsRoute = require("./products.router");

module.exports = (app) => {
   const PATH_ADMIN = systemConfig.prefixAdmin;

   app.use(PATH_ADMIN + "/dashboard", dashboardRoute);

   app.use(PATH_ADMIN + "/products", productsRoute);
}