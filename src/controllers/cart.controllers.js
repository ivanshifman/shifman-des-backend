import * as service from "../services/cart.services.js";

export const getCarts = async (req, res) => {
  try {
    const allCarts = await service.getCarts();
    if (!allCarts || allCarts.length === 0) {
      return res.status(404).send({ msg: "Carts not found" });
    }
    return res.status(200).json(allCarts);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getCartsById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartById = await service.getCartsById(id);
    if (!cartById) {
      return res.status(404).send({ msg: "Cart not found" });
    }
    res.status(200).json(cartById);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const addCarts = async (req, res) => {
  try {
    const newCart = await service.addCarts();
    if (!newCart) {
      return res.status(404).send({ msg: "Product could not be added" });
    }
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const updateCarts = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCart = await service.updateCarts(id, req.body);
    if (!updateCart) {
      return res.status(404).send({ msg: "Cart not update" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const deleteCarts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await service.deleteCarts(id);
    if (!deleteCart) {
      return res.status(404).send({ msg: "Cart could not be deleted" });
    }
    res.status(200).json(deleteCart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const addProductInCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const addProductInCart = await service.addProductInCart(cartId, prodId);
    if (!addProductInCart) {
      return res.status(404).send({ msg: "Cart or product not found" });
    }
    res.status(200).json(addProductInCart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const deleteProdInCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const deleteProdToCart = service.deleteProdInCart(cartId, prodId);
    if (!deleteProdToCart) {
      return res.status(404).send({ msg: "Cart or product not found" });
    }
    res.status(200).json(deleteProdToCart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const updateQuantityProdInCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const { quantity } = req.body;
    const updateProdQuantity = await service.updateQuantityProdInCart(
      cartId,
      prodId,
      quantity
    );
    if (!updateProdQuantity) {
      return res
        .status(404)
        .send({ msg: "Error update product quantity to cart" });
    }
    res.status(200).json(updateProdQuantity);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const emptyCart = await service.clearCart(cartId);
    if (!emptyCart) {
      return res.status(404).send({ msg: "Error clear cart" });
    }
    res.status(200).json(emptyCart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
