import { AuthLogin, newUser, deleteUser } from "../controllers/userController"; 
import { accessTokenSecret, authenticateJWT } from "../controllers/auth";
import jwt from "jsonwebtoken"; 
import logger from "../logger";


import express from "express"; 
const userRouter = express.Router(); 
// Route to handle user login
userRouter.post("/login", async function(req, res, next){
  const username = req.body.username; 
  const password = req.body.password; 
  try {
    const validUser = await AuthLogin(username, password);
    logger.info('Rounting to handle user login!');    
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
    logger.error('Routing to handle user login failed');
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
    logger.info('Routing to handle user signup!');
    res.json().status(201).send(); 
  }
  catch{
    logger.error('Routing to handle user signup failed');
    res.sendStatus(400); 
  }
})


// Route to delete a user (authenticated)
userRouter.delete("/deleteme", authenticateJWT, async function(req, res){
  const userID = req.user as string;
    try {
    const userDelete = await deleteUser(userID);
    res.cookie("token", "none", {maxAge: 1});
    logger.info('Routing to delete user!');
    res.sendStatus(201);
  }
  catch {
    logger.error('Routing to delete user failed');
    res.sendStatus(400);
  }
});
// Route to handle user logout (authenticated)
userRouter.get("/logout", authenticateJWT, async function(req, res){
  try {
    res.cookie("token", "none", {maxAge: 1});
    logger.info('Routing to handle user logout!');
    res.sendStatus(200);
  } catch {
    logger.error('Routing to logout user failed');
    res.sendStatus(400);
  }
  
});

// Route to check if a user is authenticated (session check)
userRouter.get("/session", authenticateJWT, (req, res) => {
 res.sendStatus(200);  
}); 



export default userRouter;


