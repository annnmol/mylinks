import { config } from "dotenv";

config();

// environment variables
const JWT_SECRET = process.env.JWT_SECRET! ?? "";

const PORT = Number(process.env.PORT ?? 3000);

const NODE_ENV = process.env.NODE_ENV ?? "development";

const MONGO_DB_URI = process.env.MONGO_DB_URI ?? "";

const MONGO_DB_NAME = process.env.MONGO_DB_NAME ?? "";

export { JWT_SECRET, PORT, NODE_ENV, MONGO_DB_URI, MONGO_DB_NAME };
