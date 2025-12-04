const express = require('express')
const route = express.Router();
const controller = require("../../controller/client/products.controlle");

  route.get('/', controller.index)

  route.get('/:slug', controller.detail)

module.exports = route;



