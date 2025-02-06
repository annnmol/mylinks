import { Socket } from "socket.io-client";
import { create } from "zustand";

// type Opts = Partial<ManagerOptions & SocketOptions>;

type SocketStore = {
  socket: Socket | null;
  isSocketConnected: boolean;
  setSocket: (socket: Socket | null) => void;
  removeSocket: () => void;
};

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  isSocketConnected: false,

  setSocket: (payload: Socket | null) => {
    set({ socket: payload });
    set({ isSocketConnected: payload?.connected});
  },

  removeSocket: () => {
    set({ socket: null, isSocketConnected: false });
  },
}));

export default useSocketStore;
