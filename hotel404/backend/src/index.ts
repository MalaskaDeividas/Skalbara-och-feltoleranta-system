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

declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
}
// Express server initialization
const app = express(); 

// CORS middleware: Handles cross-origin resource sharing
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
})); 
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
    sameSite: 'none', 
    secure: true
  }
}));

// MongoDB Database Connection
const mongoURI = 'mongodb+srv://Cluster46730:VE9vWGN0YkFm@cluster46730.bv6pq.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=Cluster46730'

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
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
app.listen(7700, () => {
  console.log("Listening on port 7700"); 
}); 
