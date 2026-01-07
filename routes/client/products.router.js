const express = require('express')
const route = express.Router();
const controller = require("../../controller/client/products.controlle");

  route.get('/', controller.index)

  route.get('/detail/:slugProduct', controller.detail)

  route.get('/:slugCategory', controller.category)

module.exports = route;



