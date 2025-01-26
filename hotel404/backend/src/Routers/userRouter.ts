import { AuthLogin, newUser, deleteUser } from "../controllers/userController"; 
import { accessTokenSecret, authenticateJWT } from "../controllers/auth";
import jwt from "jsonwebtoken"; 


import express from "express"; 
const userRouter = express.Router(); 
// Route to handle user login
userRouter.post("/login", async function(req, res, next){
  const username = req.body.username; 
  const password = req.body.password; 
  try {
    const validUser = await AuthLogin(username, password);    
    const accessToken = jwt.sign({username: username}, accessTokenSecret, {expiresIn: "20m"});
    res.cookie('token', accessToken, {httpOnly: true}); 
    res.sendStatus(201); 
    req.session.isLoggedIn = true;
    req.session.username = username;
    console.log(req.session.username); 
    next(); 
  }
  catch (error) {
  console.log(error); 
    res.status(400).send(error)
  }
  
});   

// Route to handle user signup
userRouter.post("/signup", async function(req, res){
  const username = req.body.username; 
  const password = req.body.password; 
  const name = req.body.name; 
  const lastname = req.body.lastname; 
  const age = req.body.age; 
  const isAdmin = false; 
  try {
    const createUser = await newUser(name, lastname, username, age, password, isAdmin);
    const accessToken = jwt.sign({username: username}, accessTokenSecret, {expiresIn: "20m"});
    res.cookie('token', accessToken, {httpOnly: true}); 
    res.json().status(201).send(); 
  }
  catch{
    res.sendStatus(400); 
  }
})


// Route to delete a user (authenticated)
userRouter.delete("/deleteme", authenticateJWT, async function(req, res){
  const userID = req.user as string;
    try {
    const userDelete = await deleteUser(userID);
    res.cookie("token", "none", {maxAge: 1});
    res.sendStatus(201);
  }
  catch {
    res.sendStatus(400);
  }
});
// Route to handle user logout (authenticated)
userRouter.get("/logout", authenticateJWT, async function(req, res){
  try {
    res.cookie("token", "none", {maxAge: 1});
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
  
});

// Route to check if a user is authenticated (session check)
userRouter.get("/session", authenticateJWT, (req, res) => {
 res.sendStatus(200);  
}); 



export default userRouter;


