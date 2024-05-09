import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productsRouter = Router();
const product = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    let allProducts = await product.getProducts();
    if (!allProducts || allProducts.length === 0) {
      return res.status(404).send({ msg: "Products not found" });
    }
    if (!limit) {
      return res.status(200).json(allProducts);
    } else {
      let productsLimit = allProducts.slice(0, limit);
      if (!productsLimit || productsLimit.length === 0) {
        return res.status(404).send({ msg: "Products not found" });
      }
      return res.status(200).json(productsLimit);
    }
  } catch (error) {
    res.status(500).send({ msg: "Product query error" });
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let productById = await product.getProductsById(id);
    if (!productById || productById === "Product not found") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).json(productById);
  } catch (error) {
    res.status(500).send({ msg: "Product search error" });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    let newProduct = req.body;
    let addProducts = await product.addProducts(newProduct);
    if (addProducts !== "Product added") {
      return res.status(404).send({ msg: "Product could not be added" });
    }
    res.status(200).json(addProducts);
  } catch (error) {
    res.status(500).send({ msg: "Error adding product" });
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updateProduct = req.body;
    let productById = await product.updateProducts(id, updateProduct);
    if (!productById || productById === "Product not found") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).json(productById);
  } catch (error) {
    res.status(500).send({ msg: "Error updating product" });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let productById = await product.deleteProducts(id);
    if (!productById || productById === "Product not found") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).json(productById);
  } catch (error) {
    res.status(500).send({ msg: "Product deletion error" });
  }
});

export default productsRouter;
