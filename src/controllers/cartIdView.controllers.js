import { getCartsById } from "../services/cart.services.js";

export const getCartIdView = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await getCartsById(cartId);
        if (!cart) {
          return res.sendUserError(404, { msg: "Cart not found" }).render("error", { msg: "Cart not found" })
        }
        res.render("cartId", { cart });
      } catch (error) {
        res.sendServerError(500, error)
      }
}