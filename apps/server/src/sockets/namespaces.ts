import { Namespace } from "socket.io";
import { socketMiddleware } from "./middleware";
import { SOCKET_EVENTS } from "./events";

//custom imports

export type ISOCKETNAMESPACE = Namespace;

/**
 * Setup the public namespace.
 * @param {Namespace} namespace - The Socket.IO namespace for public connections.
 */

export const setupPublicSocket = async (namespace: Namespace) => {
  namespace.on("connection", (socket) => {
    console.info("Public socket connected:", socket.id);

    socket.on(SOCKET_EVENTS.LOGIN_SUCCESS, (data) => {
      console.info("Login success event received:", data);
      socket.emit(SOCKET_EVENTS.LOGIN_ACK, {
        message: "Login event received.",
      });
    });

    socket.on("disconnect", () => {
      console.info("Public socket disconnected:", socket.id);
    });
  });
};

/**
 * Setup the protected namespace.
 * @param {Namespace} namespace - The Socket.IO namespace for protected connections.
 */

export const setupProtectedSocket = async (namespace: Namespace) => {
  namespace.use(socketMiddleware);

  namespace.on("connection", (socket) => {
    console.info(
      "Protected socket connected:",
      socket.id,
      "User:",
      socket.user,
      "Username:",
      socket.username
    );

    // Example of emitting events using `username`
    socket.on(SOCKET_EVENTS.FETCH_SESSIONS, () => {
      console.info("Fetch sessions request for:", socket.username);

      socket.emit(SOCKET_EVENTS.SESSIONS_DATA, {
        username: socket.username,
        sessions: [{ id: "123", device: "mobile" }],
      });
    });

    socket.on(SOCKET_EVENTS.CUSTOM_EVENT_FOR_USER, (data) => {
      console.info(`Custom event received for ${socket.username}:`, data);
      socket.to(socket.username!).emit(SOCKET_EVENTS.RESPONSE_EVENT, {
        status: "success",
        data: "Processed your request.",
      });
    });

    socket.on("disconnect", () => {
      console.info(
        "Protected socket disconnected:",
        socket.id,
        "Username:",
        socket.username
      );
    });
  });
};
