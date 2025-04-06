import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser";
import hotelRouter from "./Routers/hotelRouter"; // this file must exist in this service
import logger from '../../../src/logger'; // if used, otherwise remove

const app = express();
const PORT = 8080;

// MongoDB connection (can be reused across all services)
const mongoURI = 'mongodb+srv://made22sx:ae4XaUE6VJDjgBss@cluster0.h4bzj.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB error:', err));

// Middlewares
app.use(cors({
  origin: ["http://9.223.136.86", "http://9.223.136.86/80"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  },
}));

// Health check endpoints
app.get("/healthz", (_, res) => {
  res.status(mongoose.connection.readyState === 1 ? 200 : 500).send("Health check");
});
app.get("/startup", (_, res) => res.status(200).send("Started"));
app.get("/ready", (_, res) => {
  res.status(mongoose.connection.readyState === 1 ? 200 : 500).send("Ready");
});

// Only hotel routes here
app.use("/api/hotels", hotelRouter);

// Log all requests
app.use((req, _, next) => {
  console.log(req.method, req.path);
  next();
});

// Start service
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🏨 Hotel service running on port ${PORT}`);
});
