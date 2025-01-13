import { Request, RequestHandler, Response } from "express";
import admin from "firebase-admin";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
// custom imports
import { firestore } from "../lib/firebase";
import { IDevice, IQRCode } from "../models/user";
import { createUserDevice, getUserDevices } from "../services/devices.services";
import { getUserById } from "../services/user.services";
import { generateTokenAndSetCookie } from "../lib/generate-jwt-token";
import { excludeKeys } from "../lib/utils";

export const isQRCodeValid = (createdAt: Date): boolean => {
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  return createdAt >= fiveMinutesAgo;
};

const generateQR: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { deviceType, deviceName } = req.body;

    if (!deviceType || !deviceName) {
      return res.status(400).json({ error: "Device name is required." });
    }

    // Generate unique QR data
    const qrRef = firestore.collection("qrcodes").doc();

    const id = qrRef.id;
    const qrData: IQRCode = {
      id,
      deviceName,
      deviceType,
      createdAt: admin.firestore.FieldValue.serverTimestamp() as any,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
    };

    await qrRef.set(qrData);

    // Generate QR code image
    const code = await QRCode?.toDataURL(id);

    // Respond with the QR code data
    return res.status(201).json({
      code, // Base64 encoded image
      id,
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return res.status(500).json({ error: "Failed to generate QR code." });
  }
};

const validateQR: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req?.user;
    const userId = user?.id;

    const { id: qrId } = req.body;

    if (!qrId || !userId) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    // Retrieve QR code from Firestore
    const qrDoc = await firestore.collection("qrcodes").doc(qrId).get();

    if (!qrDoc.exists) {
      return res.status(404).json({ error: "QR code not found." });
    }

    const qrData = qrDoc.data();

    if (!qrData) {
      return res.status(404).json({ error: "QR code not found." });
    }

    // Check if the QR code is valid
    const createdAt = qrData.createdAt.toDate();
    if (!isQRCodeValid(createdAt)) {
      // QR code is older than 5 minutes, delete it
      await firestore.collection("qrcodes").doc(qrId).delete();
      return res.status(400).json({ error: "QR code expired." });
    }

      const sessionToken: string = uuidv4();
      let deviceId: string = '';

    //now we need to update the user's device list
    //we need to get the user's devices
    // Check if the device already exists
    const devicesSnapshot = await firestore
      .collection(`users/${userId}/devices`)
      .where("deviceName", "==", qrData?.deviceName)
      .get();

    if (!devicesSnapshot.empty) {
      // Device exists, update it
      const deviceDoc = devicesSnapshot.docs[0];
      const updateData = {
        deviceType: qrData.deviceType,
        sessionToken,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: true,
      };
     deviceId= await deviceDoc.ref.update(updateData);
    } else {
      // Device does not exist, create a new one
      const newDevice: IDevice = {
        id: "",
        deviceName: qrData.deviceName,
        deviceType: qrData.deviceType,
        sessionToken,
        isActive: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp() as any,
        updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
      };
     deviceId=await createUserDevice(userId, newDevice);
    }

    // Emit real-time updates
    // update the unauthenticated device with the session token
    // io.to(qrData?.socketId).emit("qrAuth", { sessionToken, userId, c });

    //update the user's devices list on already authenticated devices
    const devices = await getUserDevices(userId);
    // io.to(userId).emit("devices_updated", { data: devices });

    //delete the qr code
    await firestore.collection("qrcodes").doc(qrId).delete();

    return res.status(200).json({ message: "Device added successfully.", sessionToken,userId, deviceId });
  } catch (error) {
    console.error("Error validating QR code:", error);
    return res.status(500).json({ error: "Failed to validate QR code." });
  }
};

const loginViaSessionToken: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, userId } = req.body;

  if (!token || !userId) {
    return res.status(400).json({ error: "QR code expired." });
  }

  try {
    // Check if the user already exists
    const userData = await getUserById(userId);

    if (!userData) {
      return res.status(400).json({ error: "QR code expired." });
    }

    const sanitizedData = excludeKeys(userData, ["password", "devices"]);

    // Generate JWT token here
    generateTokenAndSetCookie(userId.toString(), res);

    return res.status(200).json({ userId, token: token, user: sanitizedData });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { generateQR, validateQR, loginViaSessionToken };
