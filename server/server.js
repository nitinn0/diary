const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nitinkapoor117:PRAJWa67IbBncLHG@test-db.rwlyl.mongodb.net/diary-db";


// MongoDB connection with error handling
console.log('Connecting to MongoDB at:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
