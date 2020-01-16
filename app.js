var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();
const root = path.join(__dirname, "build");

// view engine setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static directory

// set view options
app.set("view options", { layout: false });

app.use(express.static(root));
app.get("*", (_, res) => {
  res.sendFile("index.html", { root });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
