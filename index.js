let path = require("path");
let express = require("express");
let mongoose = require("mongoose");
let expHbs = require("express-handlebars");
let bodyParser = require("body-parser");
let expressValidator = require("express-validator");
let expressSession = require("express-session");
let connectFlash = require("connect-flash");
let fileUpload = require("express-fileupload");

let apiRouter = require("./routes/api/index");
let dashboardRouter = require("./routes/dashboard");

const { CategoryRouter, CustomerRouter, ProductRouter, OrderRouter, ShopRouter, LoginRouter, UserRouter } = require('./routes')

let { APP_NAME, DB_HOST, DB_NAME, DB_PORT, PORT } = require("./config");

// create db connection
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

mongoose.connection.once("connected", function() {
  console.log("Connected to database");
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

// initialize express app
let app = express();

// express-handlebars middleware
app.engine("hbs", expHbs({defaultLayout: "main", extname: ".hbs"}));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "")));

// body-parser middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(fileUpload());

// express session middleware
app.use(expressSession({
  secret: 'secret',
}));

// express validator middleware
app.use(expressValidator());

// connect flash middleware
app.use(connectFlash());

// global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.appname = APP_NAME,
  res.locals.user = req.session.user
  next();
});

// shopping route
app.use('/shop', ShopRouter)

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.user && req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.user = null
  res.redirect('/login')
})

app.get("/", dashboardRouter);

app.use("/api", apiRouter);

app.use('/categories', CategoryRouter)

app.use('/customers', CustomerRouter)

app.use('/orders', OrderRouter)

app.use('/products', ProductRouter)


app.use('/users', UserRouter)

// app.use("/reports", dashboardRouter);

// app.use ("/orders", orderRouter);

// app.use("/products", productRouter);

// app.use("/categories", categoryRouter);

// app.use("/customers", customerRouter);

// app.use("/store-settings", storeRouter);

// app.use("/notifications", notificationRouter);

// listen to port
app.listen(PORT, function() {
   console.log(`${APP_NAME} server running on port ${PORT}`);
});