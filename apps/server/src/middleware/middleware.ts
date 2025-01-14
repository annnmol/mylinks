import { NextFunction, Request, Response } from "express";

//custom imports
import { decodeToken, removeTokenAndSetCookie } from "../lib/generate-jwt-token";
import { excludeKeys } from "../lib/utils";
import { getUserById } from "../services/user.services";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      removeTokenAndSetCookie(res);
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded: any = decodeToken(token);

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
