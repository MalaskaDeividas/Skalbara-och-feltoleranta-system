import jwt from "jsonwebtoken"; 
import { Request, Response, NextFunction } from "express"; 

// Secret key for signing and verifying JWT tokens
export const accessTokenSecret = "CcBcjADRsaP6AHcWZ0tn";

// Middleware function to authenticate the JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.cookies.token;

    // If a token is found, verify it
    if (token) {
        try {
            // Verify the token using the accessTokenSecret
            const decode = jwt.verify(token, accessTokenSecret);

            // Attach the decoded username to the request object
            req.user = (decode as { username: string }).username;
            next(); 
        } catch (error) {
            
            return res.sendStatus(403); 
        }
    } else {

        res.sendStatus(401); 
    }
};
