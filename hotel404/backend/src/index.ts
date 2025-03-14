// src/index.js
// för att köra: PS C:\Users\David\Desktop\Skola\WA\hotel-404\backend\src> npx tsx index.ts
import express from "express"; 
import mongoose from "mongoose";
import hotelRouter from "./Routers/hotelRouter"; 
import userRouter from "./Routers/userRouter"; 
import bookingRouter from "./Routers/bookingRouter";
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser"; 
import logger from './logger.js';

// Now you can use the logger throughout your app:
logger.info("Application is starting...");

/* declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
} */
// Express server initialization
const app = express(); 

app.use(cors({
  origin: ["http://9.223.187.12", "http://9.223.187.12/80"], // Allow both with and without :80
  credentials: true
}));


// CORS middleware: Handles cross-origin resource sharing
/* app.use(cors({
  origin: "http://9.223.153.191:80", // frontend IP
  credentials: true
}));  */
// Parse incoming JSON request.
// Middleware: Parses incoming JSON requests
app.use(express.json());

// Middleware: Parses cookies from incoming requests
app.use(cookieParser()); 

// Session middleware: Manages user sessions with settings like expiration
app.set("trust proxy", 1); 
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 30*60*1000, //store cookies for 30 mins
    sameSite: "none", 
    secure: true,
    httpOnly: true,
  },
}));

// MongoDB Database Connection
const mongoURI = 'mongodb+srv://made22sx:ae4XaUE6VJDjgBss@cluster0.h4bzj.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Liveness Probe
app.get("/healthz", (req, res) => {
  if (mongoose.connection.readyState === 1){
      res.status(200).send("Ready");
  }
  else {
      res.status(500).send("Not Ready");
  }
});

//Startup probe
app.get("/startup", (req, res)=> {
  res.status(200).send("Started");
});

// Readiness Probe
app.get("/ready", (req, res) => {

  if (mongoose.connection.readyState === 1){
      res.status(200).send("Ready");
  }
  else {
      res.status(500).send("Not Ready");
  }


});

// Route handling
app.use("/api/hotels", hotelRouter); 
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter); 

// Logging middleware: Logs request method and path
app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
}); 

// Start server on port 7700
app.listen(8080, "0.0.0.0" , () => {
  console.log("Listening on port 8080"); 
}); 