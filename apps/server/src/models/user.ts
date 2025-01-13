import admin from "firebase-admin";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  devices: IDevice[];
}

export interface IDevice {
  id: string;
  deviceName: string;
  sessionToken: string | null;
  deviceType: string;
  isActive: boolean;
  devicePushToken?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface IQRCode {
  id: string;
  deviceName: string;
  deviceType: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  socketId?: string;
}
