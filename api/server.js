const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../backend/db");
const authRoutes = require("../backend/routes/auth");
const protectedRoutes = require("../backend/routes/protected");

const app = express();

// Connect DB
connectDB();

// CORS FIX
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-meal-planner-jet.vercel.app"
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Vercel Backend Working!" });
});

// Export for Vercel
module.exports = serverless(app);
