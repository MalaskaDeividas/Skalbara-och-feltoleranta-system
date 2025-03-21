import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import logger from "../logger";

// Secret key for signing and verifying JWT tokens
const accessTokenSecret = "CcBcjADRsaP6AHcWZ0tn";

// Endpoint to login and issue a JWT token
export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Dummy authentication logic (replace with your actual login logic)
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, accessTokenSecret, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};
