import { connect } from "mongoose";
import { config } from "../../config/config.js";
import { logger } from "../../utils/loggers/logger.js";

const MONGO_URL = config.MONGO_URL;

export const initMongoDB = async () => {
  try {
    await connect(MONGO_URL);
    logger.info("Connected to MongoDB")
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error)
  }
};
