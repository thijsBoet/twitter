const express = require("express");
const pug = require("pug");
const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`)
);

app.set("view engine", "pug");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.status(200).render("home")
})