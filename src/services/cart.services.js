import CartDao from "../daos/mongoDB/cart.dao.js";
import ProductDao from "../daos/mongoDB/product.dao.js";

const cartDao = new CartDao();
const productDao = new ProductDao();

export const getCarts = async () => {
  try {
    return await cartDao.getCarts();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCartsById = async (id) => {
  try {
    const cart = await cartDao.getCartsById(id);
    if (!cart) return null;
    else return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCarts = async () => {
  try {
    const newCart = await cartDao.addCarts();
    if (!newCart) return null;
    else return "Cart added";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCarts = async (id, prod) => {
  try {
    const updateCart = await cartDao.updateCarts(id, prod);
    if (!updateCart) return null;
    else return "Updated cart";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCarts = async (id) => {
  try {
    const deleteCart = await cartDao.deleteCarts(id);
    if (!deleteCart) return null;
    else return "Cart deleted";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProductInCart = async (cartId, prodId) => {
  try {
    const existCart = await cartDao.getCartsById(cartId);
    const existProd = await productDao.getProductsById(prodId);
    if (!existCart || !existProd) return null;

    const existsProductInCart = await cartDao.existsProdInCart(cartId, prodId);
    if (existsProductInCart) {
      const existingProduct = existsProductInCart.products.find(
        (p) => p.product.toString() === prodId
      );
      const quantity = existingProduct.quantity + 1;
      await cartDao.addProductInCart(cartId, prodId, quantity);
    } else {
      await cartDao.addProductInCart(cartId, prodId);
    }

    return "Product added to cart";
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteProdInCart = async (cartId, prodId) => {
  try {
    const existCart = await cartDao.getCartsById(cartId);
    const existProd = existCart.products.find(
      (p) => p.product._id.toString() === prodId
    );
    if (!existCart || !existProd) {
      throw new Error("Cart or Product not found");
    }
    await cartDao.deleteProdInCart(cartId, prodId);
    return "Product deleted to cart";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateQuantityProdInCart = async (cartId, prodId, quantity) => {
  try {
    const existCart = await cartDao.getCartsById(cartId);
    const existProd = existCart.products.find(
      (p) => p.product._id.toString() === prodId
    );
    if (!existCart || !existProd) return null;

    await cartDao.updateQuantityProdInCart(cartId, prodId, quantity);
    return "Updated quantity product in cart";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const clearCart = async (cartId) => {
  try {
    const existCart = await cartDao.getCartsById(cartId);
    if (!existCart) return null;
    await cartDao.clearCart(cartId);
    return "Empty cart";
  } catch (error) {
    throw new Error(error.message);
  }
};
