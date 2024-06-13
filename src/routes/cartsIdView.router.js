import { Router } from "express";
import { getCartsById } from "../services/cart.services.js";

const cartsIdViewRouter = Router();

cartsIdViewRouter.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await getCartsById(cartId);
    if (!cart) {
      return res.status(404).render("error", { msg: "Cart not found" });
    }
    res.render("cartId", { cart });
  } catch (error) {
    res.status(500).render("error", { msg: error.message });
  }
});

export default cartsIdViewRouter;
