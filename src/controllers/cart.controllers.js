import * as service from "../services/cart.services.js";

export const getCarts = async (req, res) => {
  try {
    const allCarts = await service.getCarts();
    if (!allCarts || allCarts.length === 0) {
      return res.sendUserError(404, { msg: "Carts not found" });
    }
    return res.sendSuccess(200, allCarts);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const getCartsById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartById = await service.getCartsById(cartId);
    if (!cartById) {
      return res.sendUserError(404, { msg: "Cart not found" });
    }
    res.sendSuccess(200, cartById);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

// export const addCarts = async (req, res) => {
//   try {
//     const newCart = await service.addCarts();
//     if (!newCart) {
//       return res.sendUserError(404, { msg: "Product could not be added" })
//     }
//     res.sendSuccess(200, newCart);
//   } catch (error) {
//     res.sendServerError(500, error)
//   }
// };

export const updateCarts = async (req, res) => {
  try {
    const { cartId } = req.params;
    const updateCart = await service.updateCarts(cartId, req.body);
    if (!updateCart) {
      return res.sendUserError(404, { msg: "Cart not update" });
    }
    res.sendSuccess(200, updateCart);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const deleteCarts = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await service.getCartsById(cartId);

    if (!cart) {
      return res.sendUserError(404, { msg: "Cart not found" });
    }

    const deleteCart = await service.deleteCarts(id);
    if (!deleteCart) {
      return res.sendUserError(404, { msg: "Cart could not be deleted" });
    }

    res.sendSuccess(200, deleteCart);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const addProductInCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const addProductInCart = await service.addProductInCart(cartId, prodId);
    if (!addProductInCart) {
      return res.sendUserError(404, { msg: "Cart or product not found" });
    }
    res.sendSuccess(200, addProductInCart);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const deleteProdInCart = async (req, res) => {
  try {
    const { cartId, prodId } = req.params;
    const deleteProdToCart = await service.deleteProdInCart(cartId, prodId);
    if (!deleteProdToCart) {
      return res.sendUserError(404, { msg: "Cart or product not found" });
    }
    res.sendSuccess(200, { msg: `Product ${prodId} deleted from cart` });
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const updateQuantityProdInCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const { quantity } = req.body;

    if (Object.keys(req.body).length !== 1 || typeof quantity !== "number") {
      return res.sendUserError(404, { msg: "Invalid request body" });
    }

    const updateProdQuantity = await service.updateQuantityProdInCart(
      cartId,
      prodId,
      quantity
    );
    if (!updateProdQuantity) {
      return res.sendUserError(404, {
        msg: "Error update product quantity to cart",
      });
    }

    res.sendSuccess(200, updateProdQuantity);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const emptyCart = await service.clearCart(cartId);
    if (!emptyCart) {
      return res.sendUserError(404, { msg: "Error clear cart" });
    }
    res.sendSuccess(200, emptyCart);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const finalizePurchase = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await service.getCartsById(cartId);
    const user = req.user;

    if (!user || !user.cart_id) {
      return res.sendUserError(400, {
        msg: "User or cart information missing",
      });
    }

    if (!cart) {
      return res.sendUserError(404, { msg: "Cart not found" });
    }

    const ticket = await service.finalizePurchase(user);

    if (!ticket) {
      return res.sendUserError(404, { msg: "Invalid request body" });
    }
    res.sendSuccess(200, ticket);
  } catch (error) {
    res.sendServerError(500, error);
  }
};
