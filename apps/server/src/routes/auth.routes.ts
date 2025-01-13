import express from "express";


import { login, logout, signup } from "../controllers/auth.controller";
import { generateQR, loginViaSessionToken } from "../controllers/qrcode.controller";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/session", loginViaSessionToken);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/qr/new", generateQR);


export default authRouter;
