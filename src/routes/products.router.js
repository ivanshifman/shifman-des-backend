import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { productValidator } from "../middlewares/productValidator.js";
import { updateProductValidator } from "../middlewares/updateProductValidator.js";
import { isAdmin } from "../middlewares/auth.js";
import { passportCall } from "../utils/passportCall.js";

const productsRouter = Router();

productsRouter.get("/", controller.getProducts);

productsRouter.get("/:id", controller.getProductsById);

productsRouter.post(
  "/",
  productValidator,
  passportCall("current"),
  isAdmin,
  controller.addProducts
);

productsRouter.put(
  "/:id",
  updateProductValidator,
  passportCall("current"),
  isAdmin,
  controller.updateProducts
);

productsRouter.delete(
  "/:id",
  passportCall("current"),
  isAdmin,
  controller.deleteProducts
);

export default productsRouter;
