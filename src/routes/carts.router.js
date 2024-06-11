import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js"

const cartRouter = Router();

cartRouter.get("/", controller.getCarts);

cartRouter.get("/:id", controller.getCartsById);

cartRouter.post("/", controller.addCarts);

cartRouter.post("/:cartId/products/:prodId", controller.addProductInCart);

cartRouter.put("/:id", controller.updateCarts);

cartRouter.put("/:cartId/products/:prodId", controller.updateQuantityProdInCart);

cartRouter.delete("/:id", controller.deleteCarts);

cartRouter.delete("/:cartId/products/:prodId", controller.deleteProdInCart);

cartRouter.put("/clear/:cartId", controller.clearCart);

export default cartRouter;
