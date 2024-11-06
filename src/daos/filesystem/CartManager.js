import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";
import { logger } from "../../utils/loggers/logger.js";

const productAll = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/daos/filesystem/carts.json";
  }

  async readCarts() {
    try {
      let carts = await fs.readFile(this.path, "utf-8");
      return carts ? JSON.parse(carts) : [];
    } catch (error) {
      logger.error(error);
    }
  }

  async writeCarts(cart) {
    try {
      await fs.writeFile(this.path, JSON.stringify(cart));
    } catch (error) {
      logger.error(error);
    }
  }

  async exists(id) {
    try {
      let carts = await this.readCarts();
      return carts.find((cart) => cart.id == id);
    } catch (error) {
      logger.error(error);
    }
  }

  async addCarts() {
    try {
      let cartsOld = await this.readCarts();
      let id = nanoid();
      let cartConcat = [{ id: id, products: [] }, ...cartsOld];
      await this.writeCarts(cartConcat);
      return "Cart added";
    } catch (error) {
      logger.error(error);
    }
  }

  async addProductInCart(cartId, productId) {
    try {
      let cartById = await this.exists(cartId);
      if (!cartById) {
        return "Cart not found";
      }
      let productById = await productAll.exists(productId);
      if (!productById) {
        return "Product not found";
      }

      let cartsAll = await this.readCarts();
      let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

      let existingProductIndex = cartById.products.findIndex(
        (prod) => prod.id === productById.id
      );

      if (existingProductIndex !== -1) {
        cartById.products[existingProductIndex].quantity++;
      } else {
        cartById.products.push({ id: productById.id, quantity: 1 });
      }

      let cartConcat = [cartById, ...cartFilter];
      await this.writeCarts(cartConcat);
      return "Product added to cart";
    } catch (error) {
      logger.error(error);
    }
  }

  async getCartsById(id) {
    try {
      let cartById = await this.exists(id);
      if (!cartById) return "Cart not found";
      return cartById;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default CartManager;
