const express = require('express')
const route = express.Router();

const controller = require("../../controller/admin/account-client.controlle")

route.get("/", controller.index)


module.exports = route;



