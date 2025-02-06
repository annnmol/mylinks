// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { zustandStorage } from "../storage-mmkv";
// import { IAuthUser, IUserConfig } from "@mobile/types/auth";
// import productConfig from "@mobile/src/lib/product";

// export const STORAGE_KEY = `${productConfig.identifier}-auth-user`;

// interface StoreState {
//   authSession: IAuthUser | null | undefined;
//   setAuthSession: (authSession: IAuthUser | null) => void;

//   getaHost: string | null | undefined;
//   setGetaHost: (getaHost: string | null) => void;

//   authToken: string | null | undefined;
//   setAuthToken: (authToken: string | null) => void;

//   userConfig: IUserConfig | null | undefined;
//   setUserConfig: (userConfig: IUserConfig | null) => void;

//   setAuthState: (
//     authSession: IAuthUser | null,
//     getaHost: string | null,
//     authToken: string | null
//   ) => void;

//   removeAuthState: () => void;
// }

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       authSession: null,
//       setAuthSession: async (payload: IAuthUser | null) => {
//         set({ authSession: payload });
//       },

//       getaHost: null,
//       setGetaHost: async (payload: string | null) => {
//         set({ getaHost: payload });
//       },

//       authToken: null,
//       setAuthToken: async (payload: string | null) => {
//         set({ authToken: payload });
//       },

//       setAuthState: async (
//         authSession: IAuthUser | null,
//         getaHost: string | null,
//         authToken: string | null
//       ) => {
//         set({ authSession, getaHost, authToken });
//       },

//       userConfig: null,
//       setUserConfig: async (payload: IUserConfig | null) => {
//         set({ userConfig: payload });
//       },

//       // Clear all data
//       removeAuthState: () =>
//         set({
//           authSession: null,
//           getaHost: null,
//           authToken: null,
//           userConfig: null,
//         }),
//     }),
//     {
//       name: STORAGE_KEY, // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
//       partialize: (state: StoreState) => ({
//         authSession: state.authSession,
//         getaHost: state.getaHost,
//         authToken: state.authToken,
//       }),
//     }
//   )
// );

// export default useAuthStore;
