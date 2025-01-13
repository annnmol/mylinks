import { Request, RequestHandler, Response } from "express";

import { firestore } from "../lib/firebase";
import { excludeKeys } from "../lib/utils";
import { deleteUserById, getUserById, updateUserById } from "../services/user.services";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const getMe: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req?.user;
    const userId = user?.id;

    if (!user || !userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log("Error in getMe controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const sanitizedData = excludeKeys(user, ["password", "devices"]);

    res.status(200).json({
      data: sanitizedData,
    });
  } catch (error) {
    console.log("Error in getUser controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req?.user;
    const userId = user?.id;
    const { id } = req?.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await deleteUserById(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.log("Error in delete device controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req?.user;
    const userId = user?.id;
    const {fullName} = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await updateUserById(userId, {fullName});

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    console.log("Error in updateUser controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export {getMe, getUser, deleteUser, updateUser };
