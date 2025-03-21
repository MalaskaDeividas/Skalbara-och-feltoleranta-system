import request from "supertest";
import jwt from "jsonwebtoken";
import express, {Request, Response, NextFunction } from "express";
import { Cookie } from "express-session";
import { accessTokenSecret } from "../src/controllers/auth";
import cookieParser from "cookie-parser";
import { login, authenticateJWT } from "../src/controllers/authenticate-service"; // adjust path as needed

declare module "express-serve-static-core" {
    interface Request {
      user?: string; 
    }
}
//Skapar en test Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/login", login);
app.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

//mock routar 
app.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

describe("JWT Auth controller", ()=> {
    it("should return 401 if no token is provided", async() => {
        const response = await request(app).get("/protected");
        expect(response.status).toBe(401);
    });

    it("should return 403 for invalid token", async () => {
        const response = await request(app)
        .get("/protected")
        .set("Cookie", "token=invalidToken");
        expect(response.status).toBe(403);
    });

    it("should allow access with a valid token", async() => {
        //ska skapa en validtoken
        const validToken = jwt.sign({ username: "testuser" }, accessTokenSecret, {expiresIn: "1h"});
        const response = await request(app)
            .get("/protected")
            .set("Cookie", `token=${validToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Access granted", user: "testuser" });
    });
});
