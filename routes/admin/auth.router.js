const express = require('express')
const route = express.Router();
// const multer  = require('multer')
// const storageMulter = require(`../../helpers/storageMulter`)
// const upload = multer({ storage: storageMulter() })

const controller = require("../../controller/admin/auth.controll")

route.get("/login", controller.login)

route.post('/login', controller.loginPost);

route.get('/logout', controller.logOut);


module.exports = route;



