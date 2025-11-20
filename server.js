import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (to verify deployment)
app.get("/", (req, res) => {
  res.json({ 
    status: "OK",
    message: "Backend is running successfully!",
    environment: process.env.NODE_ENV || "production"
  });
});

// Routes
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Export app for Vercel
export default app;
