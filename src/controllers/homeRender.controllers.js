import { getProducts } from "../services/product.services.js";

export const getProductsRender = async (req, res) => {
  try {
    const { page, limit, category, sort } = req.query;
    const products = await getProducts(page, limit, category, sort);
    if (!products) {
      return res.sendUserError(404, { msg: "Products not found" }).render("error", { msg: "Products not found" })
    }
    res.render("home", { products });
  } catch (error) {
    res.sendServerError(500, error)
  }
};
