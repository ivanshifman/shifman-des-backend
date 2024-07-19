import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { updateCartsValidator } from "../middlewares/updateCartsValidator.js";
import { authorizeCart } from "../middlewares/cartValidator.js";
import { passportCall } from "../utils/passportCall.js";

const cartRouter = Router();

cartRouter.get("/", controller.getCarts);

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
  updateCartsValidator,
  controller.updateCarts
);

cartRouter.put(
  "/:cartId/products/:prodId",
  passportCall("current"),
  authorizeCart,
  controller.updateQuantityProdInCart
);

cartRouter.delete(
  "/:cartId",
  passportCall("current"),
  authorizeCart,
  controller.deleteCarts
);

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

export default cartRouter;
