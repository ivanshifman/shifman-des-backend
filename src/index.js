import express from "express";
import { config } from "./config/config.js";
import { loggerMiddleware, logger } from "./utils/loggers/logger.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { initMongoDB } from "./daos/mongoDB/connection.js";
import initializeSocket from "./socket.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { initializePassport } from "./passport/passport.config.local.js";
import { initializePassportJwt } from "./passport/passport.config.jwt.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./docs/swaggerOptions.js";
import MainRouter from "./routes/index.router.js";

await initMongoDB();

const app = express();

const httpServer = app.listen(config.PORT, () =>
  logger.info(`Server in port ${config.PORT}`)
);

await initializeSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggerMiddleware);
initializePassport();
initializePassportJwt();
app.use(passport.initialize());
app.use(helmet());
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

const mainRouter = new MainRouter();
app.use("/", mainRouter.getRouter());

if (config.environment === "dev") {
  app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
}

app.use("*", (req, res) => {
  res.sendUserError(404, { msg: "Page not found" });
});

export default app;
