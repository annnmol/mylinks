import { Socket } from "socket.io";

//custom imports
import { decodeToken } from "../lib/generate-jwt-token";
import { getUserById } from "../services/user.services";
import { excludeKeys } from "../lib/utils";

declare module "socket.io" {
  interface Socket {
    user?: any;
    username?: string;
  }
}

/**
 * Middleware to authenticate Socket.IO connections using JWT.
 * @param {Socket} socket - The Socket.IO socket instance.
 * @param {Function} next - Callback to proceed with the connection.
 */

const socketMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  const token = socket.handshake.auth.token;
  const username = socket.handshake.auth.username;

  if (!token) {
    console.error("Unauthorized - No Token Provided");
    return next(new Error("Unauthorized - No Token Provided"));
  }

  if (!username) {
    console.error("Unauthorized - No Username Provided");
    return next(new Error("Unauthorized - No Username Provided"));
  }

  try {
    const decoded: any = decodeToken(token);

    if (!decoded || !decoded?.userId) {
      console.error("Unauthorized - Invalid Token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    const user = await getUserById(decoded?.userId);

    if (!user) {
      console.error("Unauthorized - User Not Found");
      return next(new Error("Unauthorized - User Not Found"));
    }

    const sanitizedUser = excludeKeys(user, ["password", "devices"]);

    // Attach user info and username to the socket instance
    socket.user = sanitizedUser;
    socket.username = username;
    next();
  } catch (error) {
    console.error("Socket middleware failed:", error);
    next(new Error("Unauthorized - Invalid Token"));
  }
};

export { socketMiddleware };
