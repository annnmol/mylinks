import { Response } from "express";
import jwt from "jsonwebtoken";

//custom imports
import { JWT_SECRET, NODE_ENV } from "./config";

const isSecure = NODE_ENV !== "development";

const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "14d",
  });

  res.cookie("token", token, {
    maxAge: 14 * 24 * 60 * 60 * 1000, // MS
    httpOnly: false, // prevent XSS attacks cross-site scripting attacks
    sameSite: isSecure ? "none" : "lax", // CSRF attacks cross-site request forgery attacks
    secure: isSecure, // secure should be true in production
  });
};

const removeTokenAndSetCookie = (res: Response) => {
  // Clear the JWT token here
  res.clearCookie("token");
  res.cookie("token", "", { maxAge: 0 });
};

const decodeToken = async (token: string | null) => {
  const decoded: any = jwt.verify(token ?? "", JWT_SECRET);
  return decoded;
};

export { decodeToken, generateTokenAndSetCookie, removeTokenAndSetCookie };
