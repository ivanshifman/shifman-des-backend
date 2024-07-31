import { Router } from "express";
import productsRouter from "./products.router.js";
import userRouter from "./users.router.js";
import cartRouter from "./carts.router.js";
import homeRouter from "./home.router.js";
import cartsIdViewRouter from "./cartsIdView.router.js";
import realTimeProductsRouter from "./realTimeProducts.router.js";
import { getCustomResponses } from "../middlewares/statusCode.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use(getCustomResponses);
    this.router.use("/api/products", productsRouter);
    this.router.use("/api/auth", userRouter);
    this.router.use("/api/carts", cartRouter);
    this.router.use("/", homeRouter);
    this.router.use("/cart", cartsIdViewRouter);
    this.router.use("/realTimeProducts", realTimeProductsRouter);
  }

  getRouter() {
    return this.router;
  }
}
