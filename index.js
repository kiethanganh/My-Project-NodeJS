const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require('dotenv').config()
const route = require("./routes/client/index.router");

const routeAdmin = require("./routes/admin/index.router");

const systemConfig = require("./config/system");


// gọi database
const database = require("./config/database");

database.connect();

const app = express()
const port = process.env.PORT;

app.use(methodOverride("_method"));

// Middleware để parse dữ liệu từ form (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

// Flash
app.use(cookieParser('RAMDOMKEY'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

app.use(express.static(`${__dirname}/public`))

// Set App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Set up route
routeAdmin(app);
route(app);




app.listen(port, () => {
    console.log(`This is URL ${port}`)
})
