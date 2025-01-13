import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";

//custom imports
import admin from "../lib/firebase";
import { comparePasswordFn, hashedPasswordFn } from "../lib/hashed-password";
import { IDevice, IUser } from "../models/user";
import {
  removeTokenAndSetCookie,
  generateTokenAndSetCookie,
} from "../lib/generate-jwt-token";
import { getUserByEmail, createUser } from "../services/user.services";
import {
  createUserDevice,
  updateUserDevice,
} from "../services/devices.services";
import { excludeKeys } from "../lib/utils";

const signup: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { fullName, email, password, deviceName, deviceType } = req.body;

  if (!fullName || !email || !password || !deviceName || !deviceType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userDoc = await getUserByEmail(email);

    if (userDoc) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashedPasswordFn(password);

    // Generate random profile pic here
    const nameWithoutSpaces = fullName?.replace(/\s/g, "%20") ?? "Unknown";
    const randomProfilePic = `https://avatar.iran.liara.run/username?username=${nameWithoutSpaces}`;

    const newUser: IUser = {
      id: "", // Firestore doc id added in the service
      fullName,
      email,
      password: hashedPassword,
      profilePic: randomProfilePic,
      createdAt: admin.firestore.FieldValue.serverTimestamp() as any,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
      devices: [],
    };

    const userId = await createUser(newUser);

    const sessionToken: string = uuidv4();
    const newDevice: IDevice = {
      id: "", // Firestore doc id added in the service
      deviceName,
      deviceType,
      sessionToken,
      createdAt: admin.firestore.FieldValue.serverTimestamp() as any,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
      isActive: true,
    };

    await createUserDevice(userId, newDevice);

    const sanitizedData = excludeKeys(newUser, ["password", "devices"]);
    // Generate JWT token here
    generateTokenAndSetCookie(userId.toString(), res);

    return res
      .status(200)
      .json({ userId, token: sessionToken, user: sanitizedData });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password, deviceName, deviceType } = req.body;

  if (!email || !password || !deviceName || !deviceType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userDoc = await getUserByEmail(email);

    if (!userDoc) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const userData = userDoc.data() as IUser;

    const isPasswordCorrect = await comparePasswordFn(
      password,
      userData.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const userId: string = userDoc.id;
    const sessionToken: string = uuidv4();

    const updateData = {
      deviceType,
      sessionToken,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true,
    };

    const deviceId = await updateUserDevice(userId, deviceName, updateData);

    if (!deviceId) {
      const newDevice: IDevice = {
        id: "", // Firestore doc id added in the service
        deviceName,
        deviceType,
        sessionToken,
        createdAt: admin.firestore.FieldValue.serverTimestamp() as any,
        updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
        isActive: true,
      };
      await createUserDevice(userId, newDevice);
    }

    const sanitizedData = excludeKeys(userData, ["password", "devices"]);
    // Generate JWT token here
    generateTokenAndSetCookie(userId.toString(), res);

    return res
      .status(200)
      .json({ userId, token: sessionToken, user: sanitizedData });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, deviceName } = req.body;

  try {
    // Check if the device exists
    if (userId && deviceName) {
      const updateData = {
        deviceName,
        sessionToken: null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: false,
      };

      await updateUserDevice(userId, deviceName, updateData);
    }

    // Clear the JWT token here
    removeTokenAndSetCookie(res);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { signup, login, logout };
