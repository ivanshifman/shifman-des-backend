import { Router } from "express";
import { getProducts } from "../services/product.services.js";

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
  const {page, limit, category, sort} = req.query
  const products = await getProducts(page, limit, category, sort);
  res.render("home", { products });
});

export default homeRouter;
