import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow tools like Postman (no origin) and local frontend dev ports.
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server running on port ${process.env.PORT || 4000}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
