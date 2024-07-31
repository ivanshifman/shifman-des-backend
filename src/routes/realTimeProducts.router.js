import { Router } from "express";
import { realTimeProductsRender } from "../controllers/realTimeProducts.controllers.js";

const realTimeProductsRouter = Router();

realTimeProductsRouter.get("/", realTimeProductsRender);

export default realTimeProductsRouter;
