import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import msgpackParser from "socket.io-msgpack-parser";

// User-defined imports ̑
import { PORT } from "./lib/config";
import {
  errorHandlingLogging,
  healthCheckLogging,
  incomingRequestLogging,
} from "./lib/utils";
import middleware from "./middleware/middleware";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import { setupProtectedSocket, setupPublicSocket } from "./sockets/namespaces";

// Load environment variables
config();

/** EXPRESS app initialize */
const app = express();

/** http Server Handling */
const httpServer = http.createServer(app);

/** Socket.IO server */
const io = new Server(httpServer, {
  pingInterval: 30000, // Send a new 'ping' packet every 30 seconds
  pingTimeout: 90000, // Disconnect if no 'pong' packet is received within 60 seconds
  cors: {
    origin: "*",
    credentials: true,
  },
  // adapter: createAdapter(redisPubClient, redisSubClient),  // Attach Redis adapter
  parser: msgpackParser,
});

/** Middleware for Express */
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

// Parse incoming JSON payloads
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Log the incoming request details
app.use(incomingRequestLogging);

// Health check endpoint
app.get("/api/health-check", healthCheckLogging);

// Auth routes
app.use("/api/auth", authRouter);

// Middleware
app.use(middleware);

// Protected routes
app.use("/api/user", userRouter);

// Route error handling
app.use(errorHandlingLogging);

// Connect to MongoDB
// connectToMongoDB();

// Public namespace for unauthenticated connections
const publicNamespace = io.of("/public");
setupPublicSocket(publicNamespace);

// Protected namespace for authenticated connections
const protectedNamespace = io.of("/protected");
setupProtectedSocket(protectedNamespace);

/** Server start */
httpServer.listen(PORT, () => {
  console.info(`Server is running at PORT: ${PORT}`);
});

export default { app, io };
