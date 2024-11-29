import { CartModel } from "./models/cart.model.js";
import { TicketModel } from "./models/ticket.model.js";

class CartDao {
  async addCarts() {
    try {
      return await CartModel.create({ products: [] });
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
      const cartById = await CartModel.findById(id)
        .populate("products.product")
        .lean();
      if (!cartById) throw new Error("Cart not found");
      return cartById;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async deleteCarts(id) {
  //   try {
  //     const deleteCart = await CartModel.findByIdAndDelete(id);
  //     if (!deleteCart) throw new Error("Cart not found");
  //     return deleteCart;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

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

      const cartWithProduct = await cart.save();
      if (!cartWithProduct) return null;
      return cartWithProduct;
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
      const deleteProdIdInCartId = await CartModel.findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
      return deleteProdIdInCartId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCarts(id, prod) {
    try {
      return await CartModel.findByIdAndUpdate(id, prod, { new: true });
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

  async finalizePurchase(ticket) {
    try {
      return await TicketModel.create(ticket);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CartDao;
