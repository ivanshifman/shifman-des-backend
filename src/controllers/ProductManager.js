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

  async addProducts(product) {
    try {
      let productsOld = await this.readProducts();
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
      let products = await this.readProducts();
      let productById = products.find((prod) => prod.id == id);
      if(!productById) return "Product not found"
      return productById;
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
