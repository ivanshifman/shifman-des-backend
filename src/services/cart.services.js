import CartDao from "../daos/mongoDB/cart.dao.js";
import ProductDao from "../daos/mongoDB/product.dao.js";
import { nanoid } from "nanoid";
import { mailService } from "./mail.services.js";

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

// export const addCarts = async () => {
//   try {
//     const newCart = await cartDao.addCarts();
//     if (!newCart) return null;
//     else return "Cart added";
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export const updateCarts = async (cartId, prod) => {
  try {
    const outOfStockErrors = [];

    for (let updatedProduct of prod.products) {
      const { product, quantity } = updatedProduct;

      const productDB = await productDao.getProductsById(product);

      if (quantity > productDB.stock) {
        outOfStockErrors.push(
          `Not enough stock for product: ${productDB.title}. Requested: ${quantity}, Available: ${productDB.stock}`
        );
      }
    }

    if (outOfStockErrors.length > 0) {
      throw new Error(outOfStockErrors.join("; "));
    }

    const updateCart = await cartDao.updateCarts(cartId, prod);
    if (!updateCart) return null;
    else return updateCart;
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

      if (quantity > existProd.stock) {
        throw new Error(
          `Not enough stock for product: ${existProd.title}. Requested: ${quantity}, Available: ${existProd.stock}`
        );
      }

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

    const prodDB = await productDao.getProductsById(prodId);
    if (quantity > prodDB.stock) {
      throw new Error(
        `Not enough stock for product: ${prodDB.title}. Requested: ${quantity}, Available: ${prodDB.stock}`
      );
    }

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

export const finalizePurchase = async (user) => {
  try {
    const cart = await cartDao.getCartsById(user.cart_id);
    if (!cart) return null;

    if (cart.products.length === 0) {
      throw new Error("Cannot finalize purchase: Cart is empty.");
    }

    let amountAcc = 0;
    const outOfStockErrors = [];

    for (const prodInCart of cart.products) {
      const idProd = prodInCart.product;
      const prodDB = await productDao.getProductsById(idProd);

      if (prodInCart.quantity > prodDB.stock) {
        outOfStockErrors.push(
          `Not enough stock for product: ${prodDB.title}. Requested: ${prodInCart.quantity}, Available: ${prodDB.stock}`
        );
      } else {
        const amount = prodInCart.quantity * prodDB.price;
        amountAcc += amount;
      }
    }

    if (outOfStockErrors.length > 0) {
      throw new Error(outOfStockErrors.join("; "));
    }

    const ticket = await cartDao.finalizePurchase({
      code: nanoid(),
      purchase_datetime: new Date().toString(),
      amount: amountAcc,
      purchaser: user._id,
    });

    for (const prodInCart of cart.products) {
      const idProd = prodInCart.product;
      const prodDB = await productDao.getProductsById(idProd);
      const newStock = prodDB.stock - prodInCart.quantity;
      await productDao.updateProducts(idProd, { stock: newStock });
    }
    await mailService.sendMail({
      to: user.email,
      subject: "Thank you for your purchase",
      type: "purchase",
    });
    await cartDao.clearCart(user.cart_id);

    return ticket;
  } catch (error) {
    throw new Error(error.message);
  }
};
