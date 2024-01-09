const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register
router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", register);

// login
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", login);

// dashboard
router.get("/dashboard", authenticateToken, function (req, res, next) {
  res.render("dashboard");
});

// logout
router.get("/logout", logout);

// error
router.get("/error", function (req, res, next) {
  res.render("error");
});

router.get("/forgot", function (req, res, next) {
  res.render("forgotpassword");
});
router.post("/forgot", forgotPassword);

//
// Route for handling password reset form
router.get("/reset/:token", (req, res) => {
  const { token } = req.params;
  // Render the password reset form with the token
  res.render("resetpassword", { token });
});

router.post("/reset", resetPassword);

// router.post("/deleteaccount", deleteaccount);

module.exports = router;
