import { Router } from "express";
import ProductManager from "../daos/filesystem/ProductManager.js";

const homeRouter = Router();
const productManager = new ProductManager();

homeRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

export default homeRouter;
