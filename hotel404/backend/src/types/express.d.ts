import { UserDocument } from "../models/User"; // Adjust import path

declare global {
  namespace Express {
    interface Request {
      user?: string | UserDocument; // Update according to your user type
    }
  }
}