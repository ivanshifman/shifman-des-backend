import { Router } from "express";
import { getProducts } from "../services/product.services.js";

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
  try {
    const { page, limit, category, sort } = req.query;
    const products = await getProducts(page, limit, category, sort);
    if (!products) {
      return res.status(404).render("error", { msg: "Products not found" });
    }
    res.render("home", { products });
  } catch (error) {
    res.status(500).render("error", { msg: error.message });
  }
});

export default homeRouter;
