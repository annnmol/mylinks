import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? ""; //
const isSecure = process.env.NODE_ENV !== "development";

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "2d",
  });

  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // MS
    httpOnly: false, // prevent XSS attacks cross-site scripting attacks
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV === "production", // secure should be true in production
  });
};

export const removeTokenAndSetCookie = (res: Response) => {
  // Clear the JWT token here
  res.clearCookie("token");
  res.cookie("jwt", "", { maxAge: 0 });
};
