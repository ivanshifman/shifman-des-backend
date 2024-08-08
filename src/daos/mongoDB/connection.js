import { connect } from "mongoose";
import { config } from "../../config/config.js";

const MONGO_URL = config.MONGO_URL;

export const initMongoDB = async () => {
  try {
    await connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
