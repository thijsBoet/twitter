const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");
const app = express();

const port = process.env.PORT || 3000;
const middleware = require("./middleware");

const server = app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "OA9fbNIoxi",
    resave: true,
    saveUninitialized: false
  })
);

// Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user
  };

  res.status(200).render("home", payload);
});
