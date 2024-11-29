import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { authorizeCart } from "../middlewares/cartValidator.js";
import { passportCall } from "../utils/passportCall.js";
import { isAdmin } from "../middlewares/auth.js";
import { validator } from "../middlewares/validatorFieldsJoi.js";
import { updateCartsSchema } from "../dtos/schemasJoi/updateCart.dto.js";

const cartRouter = Router();

cartRouter.get("/", passportCall("current"), isAdmin, controller.getCarts);

cartRouter.get(
  "/:cartId",
  passportCall("current"),
  authorizeCart,
  controller.getCartsById
);

// cartRouter.post("/", controller.addCarts);

cartRouter.post(
  "/:cartId/products/:prodId",
  passportCall("current"),
  authorizeCart,
  controller.addProductInCart
);

cartRouter.put(
  "/:cartId",
  passportCall("current"),
  authorizeCart,
  validator(updateCartsSchema),
  controller.updateCarts
);

cartRouter.put(
  "/:cartId/products/:prodId",
  passportCall("current"),
  authorizeCart,
  controller.updateQuantityProdInCart
);

// cartRouter.delete(
//   "/:cartId",
//   passportCall("current"),
//   authorizeCart,
//   controller.deleteCarts
// );

cartRouter.delete(
  "/:cartId/products/:prodId",
  passportCall("current"),
  authorizeCart,
  controller.deleteProdInCart
);

cartRouter.put(
  "/clear/:cartId",
  passportCall("current"),
  authorizeCart,
  controller.clearCart
);

cartRouter.post(
  "/:cartId/purchase",
  passportCall("current"),
  authorizeCart,
  controller.finalizePurchase
)

export default cartRouter;
