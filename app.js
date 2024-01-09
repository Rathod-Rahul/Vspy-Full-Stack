const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const session = require("./config/sessionConfig");
const expressListEndpoints = require("express-list-endpoints");

const data = require("./routes/data");
const authRoute = require("./routes/authRotues");
const devicesRouter = require("./routes/devicesRouter");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session);

app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// display all data
app.use("/", data);
// authentication route
app.use("/", authRoute);
// device based realted things will on this router
app.use("/devices", devicesRouter);
console.log(expressListEndpoints(app));
module.exports = app;
