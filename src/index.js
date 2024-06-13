import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { initMongoDB } from "./daos/mongoDB/connection.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import realTimeProductsRouter from "./routes/realTimeProducts.router.js";
import homeRouter from "./routes/home.router.js";
import cartsIdViewRouter from "./routes/cartsIdView.router.js";
import initializeSocket from "./socket.js";

await initMongoDB();

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server in port ${PORT}`)
);

await initializeSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", homeRouter);
app.use("/carts", cartsIdViewRouter);
app.use("/realTimeProducts", realTimeProductsRouter);
