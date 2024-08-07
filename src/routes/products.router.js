import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { isAdmin } from "../middlewares/auth.js";
import { passportCall } from "../utils/passportCall.js";
import { validator } from "../middlewares/validatorFieldsJoi.js";
import { productSchema } from "../dtos/schemasJoi/product.dto.js";
import { updateProductSchema } from "../dtos/schemasJoi/updateProduct.dto.js";

const productsRouter = Router();

productsRouter.get("/", controller.getProducts);

productsRouter.get("/:id", controller.getProductsById);

productsRouter.post(
  "/",
  validator(productSchema),
  passportCall("current"),
  isAdmin,
  controller.addProducts
);

productsRouter.put(
  "/:id",
  validator(updateProductSchema),
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
