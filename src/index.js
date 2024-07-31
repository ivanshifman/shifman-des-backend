import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { initMongoDB } from "./daos/mongoDB/connection.js";
import initializeSocket from "./socket.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassport } from "./passport/passport.config.local.js";
import { initializePassportJwt } from "./passport/passport.config.jwt.js";
import MainRouter from "./routes/index.router.js";

await initMongoDB();

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server in port ${PORT}`)
);

await initializeSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
initializePassportJwt();
app.use(passport.initialize());
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

const mainRouter = new MainRouter();
app.use("/", mainRouter.getRouter());
