import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./lib/db.js";

import handleGlobalError from "./middleware/handleGlobalError.js";

import authRoutes from "./routes/auth.route.js";
import notificationRoutes from "./routes/notification.route.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHTEXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(handleGlobalError);

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log("Server is connecting on port:", PORT);
  connectDB();
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLEDREJECTION: shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
