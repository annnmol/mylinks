import mongoose from "mongoose";

// custom imports
import { MONGO_DB_NAME, MONGO_DB_URI } from "./config";

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      dbName: MONGO_DB_NAME,
      autoIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
