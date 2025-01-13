import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//custom imports
import { excludeKeys } from "../lib/utils";
import { getUserById } from "../services/user.services";

dotenv.config();

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.clearCookie("jwt");
      res.cookie("jwt", "", { maxAge: 0 });
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    if (!decoded || !decoded?.userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await getUserById(decoded?.userId);
    const sanitizedUser = excludeKeys(user, ["password", "devices"]);

    req.user = sanitizedUser;

    next();
  } catch (error: any) {
    console.log("Error in middleware: ", error?.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default middleware;
