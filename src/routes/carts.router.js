import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartRouter = Router();
const cart = new CartManager();

cartRouter.get("/", async (req, res) => {
  try {
    let allCarts = await cart.readCarts();
    if (!allCarts || allCarts.length === 0) {
      return res.status(404).send({ msg: "Carts not found" });
    }
    return res.status(200).json(allCarts);
  } catch (error) {
    res.status(500).send({ msg: "Error find carts" });
  }
});

cartRouter.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let cartById = await cart.getCartsById(id);
    if (!cartById || cartById === "Cart not found") {
      return res.status(404).send({ msg: "Cart not found" });
    }
    res.status(200).json(cartById);
  } catch (error) {
    res.status(500).send({ msg: "Error find cart" });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    let addCarts = await cart.addCarts();
    if (addCarts !== "Cart added") {
      return res.status(404).send({ msg: "Product could not be added" });
    }
    res.status(200).json(addCarts);
  } catch (error) {
    res.status(500).send({ msg: "Error adding cart" });
  }
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let addProductInCart = await cart.addProductInCart(cartId, productId);
    if (!addProductInCart || addProductInCart !== "Product added to cart") {
      return res.status(404).send({ msg: "Cart or product not found" });
    }
    res.status(200).json(addProductInCart);
  } catch (error) {
    res.status(500).send({ msg: "Error adding product to cart" });
  }
});

export default cartRouter;
