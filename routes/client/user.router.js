const express = require('express')
const route = express.Router();
const controller = require("../../controller/client/user.controlle");

  route.get('/register', controller.register)

  route.post('/register', controller.registerPost)

  route.get('/login', controller.login)

  route.post('/login', controller.loginPost)

  route.get('/logout', controller.logOut)


module.exports = route;



