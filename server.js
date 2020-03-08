const express = require("express");
const app = express();
const routes = require("./routes");
const middlewares = require("./middlewares");
const env = require("./env");

env.setAppEnv(app);
app.set("views", __dirname + "/public");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(middlewares);
app.use(routes);

module.exports = app;
