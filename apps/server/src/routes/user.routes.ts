import express from "express";
import { getUser, getMe, deleteUser, updateUser } from "../controllers/user.controller";
import { deleteDevice, getDevices } from "../controllers/devices.controller";
import { validateQR } from "../controllers/qrcode.controller";

const userRouter = express.Router();

userRouter.get("/me", getMe);
userRouter.put("/me", updateUser);
userRouter.get("/devices", getDevices);
userRouter.delete("/devices/:id", deleteDevice);
userRouter.post("/qr/validate", validateQR);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
