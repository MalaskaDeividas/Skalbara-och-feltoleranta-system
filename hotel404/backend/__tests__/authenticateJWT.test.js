"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../src/controllers/auth");
const express_1 = __importDefault(require("express"));
const auth_2 = require("../src/controllers/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//Skapar en test Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//mock routar 
app.get("/protected", auth_1.authenticateJWT, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});
describe("JWT Auth controller", () => {
    it("should return 401 if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/protected");
        expect(response.status).toBe(401);
    }));
    it("should return 403 for invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/protected")
            .set("Cookie", "token=invalidToken");
        expect(response.status).toBe(403);
    }));
    it("should allow access with a valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        //ska skapa en validtoken
        const validToken = jsonwebtoken_1.default.sign({ username: "testuser" }, auth_2.accessTokenSecret, { expiresIn: "1h" });
        const response = yield (0, supertest_1.default)(app)
            .get("/protected")
            .set("Cookie", `token=${validToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Access granted", user: "testuser" });
    }));
});
