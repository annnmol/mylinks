import { firestore } from "../lib/firebase";
import { IDevice } from "../models/user";

export const getUserDevices = async (userId: string) => {
  const devicesSnapshot = await firestore
    .collection(`users/${userId}/devices`)
    .get();
  if (devicesSnapshot.empty) {
    return [];
  }
  return devicesSnapshot.docs.map((doc: any) => doc.data());
};

export const createUserDevice = async (userId: string, device: IDevice) => {
  const userDevicesRef = firestore.collection(`users/${userId}/devices`).doc();
  device.id = userDevicesRef.id;
  await userDevicesRef.set(device);
  return userDevicesRef.id;
};

export const updateUserDevice = async (
  userId: string,
  deviceName: string,
  updateData: Partial<IDevice>
) => {
  const deviceSnapshot = await firestore
    .collection(`users/${userId}/devices`)
    .where("deviceName", "==", deviceName)
    .get();
  if (!deviceSnapshot.empty) {
    const deviceDoc = deviceSnapshot.docs[0];
    await deviceDoc.ref.update(updateData);
    return deviceDoc.id;
  }
  return null;
};

export const deleteUserDevice = async (userId: string, deviceId: string) => {
  const deviceRef = firestore
    .collection(`users/${userId}/devices`)
    .doc(deviceId);
  const deviceDoc = await deviceRef.get();
  if (!deviceDoc.exists) {
    throw new Error("Device not found");
  }
  await deviceRef.delete();
};
