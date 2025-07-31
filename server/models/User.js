
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  role: { type: String, enum: ["free", "premium", "pro"], default: "free" },
});

module.exports = mongoose.model("User", userSchema);
