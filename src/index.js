import express from "express";
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    const allProducts = await product.getProducts();
    if (!allProducts) res.status(404).send({ msg: "Products not found" });
    if (!limit) res.status(200).json(allProducts);
    else {
      let productsLimit = allProducts.slice(0, limit);
      if (!productsLimit) res.status(404).send({ msg: "Products not found" });
      res.status(200).json(productsLimit);
    }
  } catch (error) {
    res.status(500).send({ msg: "Product query error" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let productById = await product.getProductsById(id);
    if (!productById) res.status(404).send({ msg: "Product not found" });
    else res.status(200).send(productById);
  } catch (error) {
    res.status(500).send({ msg: "Product search error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    let newProduct = req.body;
    const addProducts = await product.addProducts(newProduct);
    if (!addProducts) res.status(404).send({ msg: "Product could not be added" });
    res.status(200).json(addProducts);
  } catch (error) {
    res.status(500).send({ msg: "Error adding product" });
  }
});

app.delete("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let productById = await product.deleteProducts(id);
        if (!productById) res.status(404).send({ msg: "Product not found" });
        else res.status(200).send(productById);
    } catch (error) {
        res.status(500).send({ msg: "Product deletion error" });
    }
})

app.listen(PORT, () => console.log(`Server in port ${PORT}`));
