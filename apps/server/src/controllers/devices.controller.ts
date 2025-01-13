import { Request, RequestHandler, Response } from "express";
import { deleteUserDevice, getUserDevices } from "../services/devices.services";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const getDevices: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req?.user;
    const userId = user?.id;

    const devices = await getUserDevices(userId);

    res.status(200).json({
      data: devices,
    });
  } catch (error) {
    console.log("Error in getDevices controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDevice: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req?.user;
    const userId = user?.id;
    const { id } = req?.params;

    if (!id) {
      return res.status(400).json({ error: "Device ID is required" });
    }

    await deleteUserDevice(userId, id);

    return res.status(200).json({ message: "Device deleted successfully" });
  } catch (error: any) {
    if (error.message === "Device not found") {
      return res.status(404).json({ error: error.message });
    }
    console.log("Error in delete device controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getDevices, deleteDevice };