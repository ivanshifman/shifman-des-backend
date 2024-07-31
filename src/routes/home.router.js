import { Router } from "express";
import { getProductsRender } from "../controllers/homeRender.controllers.js";

const homeRouter = Router();

homeRouter.get("/", getProductsRender);

export default homeRouter;
