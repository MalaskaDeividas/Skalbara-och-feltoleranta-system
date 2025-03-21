import express from "express";
import {login} from "../controllers/authenticate-service" // assuming you place logic here
import cookieParser from "cookie-parser"; 
import {authenticateJWT} from "../controllers/auth"

const app = express();
app.use(express.json());
app.use(cookieParser());

// Login route to issue tokens
app.post("/login", login);

// A protected route that requires a valid JWT
app.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

app.listen(3001, () => {
    console.log("Auth service running on port 3001");
});
