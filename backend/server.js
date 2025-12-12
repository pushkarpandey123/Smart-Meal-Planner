// backend/server.js

const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http"); // IMPORTANT for Vercel
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running on Vercel (Serverless)!" });
});

// MongoDB connection test
app.get("/test-db", async (req, res) => {
  try {
    res.send("MongoDB connection is working!");
  } catch (err) {
    res.status(500).send("MongoDB connection failed: " + err.message);
  }
});

// ❌ REMOVE app.listen()
// app.listen(PORT, ...)

// ✅ EXPORT HANDLER FOR VERCEL
module.exports = serverless(app);
