// middleware/auth.js
const jwt = require("jsonwebtoken");
const SECRET = "jwtsecret";

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};
