import winston from "winston";
import "winston-mongodb";
import { config } from "../../config/config.js";

const transports = [
  new winston.transports.MongoDB({
    db: config.MONGO_URL,
    collection: "logs",
    level: "warn",
    storeHost: true,
    tryReconnect: true,
    decolorize: true,
    expireAfterSeconds: 86400,
  }),
];

if (config.environment === "dev") {
  transports.push(
    new winston.transports.File({
      filename: "./dev.log",
      level: "info",
    }),
    new winston.transports.Console()
  );
}

export const logger = winston.createLogger({
  level: config.environment === "prod" ? "warn" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports,
});

export const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
};
