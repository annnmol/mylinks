import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import productConfig from "@mobile/src/lib/product";

export const storageMMKV = new MMKV({
  id: `${productConfig.identifier}-storage`,
  // encryptionKey:""
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storageMMKV.set(name, value);
  },
  getItem: (name) => {
    const value = storageMMKV.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storageMMKV.delete(name);
  },
};
