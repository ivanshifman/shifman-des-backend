import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  async readProducts() {
    try {
      let products = await fs.readFile(this.path, "utf-8");
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.log(error);
    }
  }

  async writeProducts(product) {
    try {
      await fs.writeFile(this.path, JSON.stringify(product));
    } catch (error) {
      console.log(error);
    }
  }

  async exists(id) {
    try {
      let products = await this.readProducts();
      return products.find((prod) => prod.id == id);
    } catch (error) {
      console.log(error);
    }
  }

  async addProducts(product) {
    try {
      const requiredKeys = [
        "title",
        "description",
        "code",
        "category",
        "stock",
        "price",
      ];
      if (!requiredKeys.every((key) => Object.keys(product).includes(key))) {
        return "Invalid product data";
      }

      if (
        !(
          typeof product.title === "string" &&
          typeof product.description === "string" &&
          typeof product.code === "string" &&
          typeof product.category === "string" &&
          typeof product.stock === "number" &&
          typeof product.price === "number"
        )
      ) {
        return "Invalid product data";
      }
      let productsOld = await this.readProducts();
      product.status = true;
      product.id = nanoid();
      let productsAll = [...productsOld, product];
      await this.writeProducts(productsAll);
      return "Product added";
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      return await this.readProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsById(id) {
    try {
      let productById = await this.exists(id);
      if (!productById) return "Product not found";
      return productById;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProducts(id, product) {
    try {
      let products = await this.readProducts();
      let productIndex = products.findIndex((prod) => prod.id === id);
      if (productIndex === -1) {
        return "Product not found";
      }
      const originalProduct = products[productIndex];
      const requiredKeys = [
        "title",
        "description",
        "code",
        "category",
        "stock",
        "price",
      ];
      if (
        !requiredKeys.every((key) => Object.keys(product).includes(key)) ||
        Object.keys(product).length !== requiredKeys.length
      ) {
        return "Invalid product data";
      }

      if (
        !(
          typeof product.title === "string" &&
          typeof product.description === "string" &&
          typeof product.code === "string" &&
          typeof product.category === "string" &&
          typeof product.stock === "number" &&
          typeof product.price === "number"
        )
      ) {
        return "Invalid product data";
      }

      products[productIndex] = { ...originalProduct, ...product };
      await this.writeProducts(products);
      return "Updated product";
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProducts(id) {
    try {
      let products = await this.readProducts();
      let existsProducts = products.some((prod) => prod.id === id);
      if (existsProducts) {
        let filterProducts = products.filter((prod) => prod.id != id);
        await this.writeProducts(filterProducts);
        return "Product deleted";
      } else {
        return "Product not found";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
