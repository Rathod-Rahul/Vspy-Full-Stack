const session = require("express-session");
module.exports = session({
  secret: "your_secrdfdfdet_key",
  resave: false,
  saveUninitialized: false,
});
