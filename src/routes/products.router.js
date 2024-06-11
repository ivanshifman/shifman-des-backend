import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { productValidator } from "../middlewares/productValidator.js";
import { updateProductValidator } from "../middlewares/updateProductValidator.js";

const productsRouter = Router();

productsRouter.get("/", controller.getProducts);

productsRouter.get("/:id", controller.getProductsById);

productsRouter.post("/", productValidator, controller.addProducts);

productsRouter.put("/:id", updateProductValidator, controller.updateProducts);

productsRouter.delete("/:id", controller.deleteProducts);

export default productsRouter;
