import { CartModel } from "./models/cart.model.js";

class CartDao {
  async addCarts() {
    try {
      await CartModel.create({ products: [] });
      return "Cart added";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCarts() {
    try {
      return await CartModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartsById(id) {
    try {
      const cartById = await CartModel.findById(id).populate(
        "products.product"
      ).lean();
      if (!cartById) throw new Error("Cart not found");
      return cartById;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCarts(id) {
    try {
      await CartModel.findByIdAndDelete(id);
      return "Cart deleted";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductInCart(cartId, prodId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) return null;

      const existingProductIndex = cart.products.findIndex(
        (p) => p.product.toString() === prodId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quantity;
      } else {
        cart.products.push({ product: prodId, quantity });
      }

      await cart.save();
      return "Product added to cart";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async existsProdInCart(cartId, prodId) {
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProdInCart(cartId, prodId) {
    try {
      await CartModel.findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
      return "Product deleted to cart";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCarts(id, prod) {
    try {
      await CartModel.findByIdAndUpdate(id, prod, { new: true });
      return "Updated cart";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateQuantityProdInCart(cartId, prodId, quantity) {
    try {
      await CartModel.findOneAndUpdate(
        { _id: cartId, "products.product": prodId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      return "Updated quantity product in cart";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async clearCart(cartId) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );
      if (!updatedCart) throw new Error("Cart not found");
      return "Empty cart";
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CartDao;
