const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/error");

    // res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, "rathodrahul", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
