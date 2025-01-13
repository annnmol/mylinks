import { firestore } from "../lib/firebase";
import { IUser } from "../models/user";

export const getUserByEmail = async (email: string) => {
  const userSnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();
  if (userSnapshot.empty) {
    return null;
  }
  return userSnapshot.docs[0];
};

export const createUser = async (user: IUser) => {
  const newUserRef = firestore.collection("users").doc();
  user.id = newUserRef.id;
  await newUserRef.set(user);
  return newUserRef.id;
};

export const getUserById = async (id: string) => {
  const userDoc = await firestore.collection("users").doc(id).get();
  if (!userDoc.exists) {
    return null;
  }
  return userDoc.data();
};

export const deleteUserById = async (userId: string) => {
  const userRef = firestore.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  // Delete all devices associated with the user
  const devicesSnapshot = await firestore
    .collection(`users/${userId}/devices`)
    .get();
  const deletePromises = devicesSnapshot.docs.map((doc: any) =>
    doc.ref.delete()
  );
  await Promise.all(deletePromises);

  // Delete the user document
  await userRef.delete();
};


export const updateUserById = async (userId: string, updateData: Partial<IUser>) => {
  const userRef = firestore.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  await userRef.update(updateData);
  return userRef.id;
};
