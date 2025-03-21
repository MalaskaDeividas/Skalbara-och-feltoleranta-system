// backend/src/types/express-session.d.ts
import "express-session";

declare module "express-session" {
    export interface SessionData {
        isLoggedIn?: boolean;
        username?: string;
    }
}
