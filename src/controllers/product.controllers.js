import * as service from "../services/product.services.js";

export const getProducts = async (req, res) => {
  try {
    const { page, limit, category, sort } = req.query;
    const products = await service.getProducts(page, limit, category, sort);
    const next = products.hasNextPage
      ? `http://localhost:8080/api/products?page=${products.nextPage}`
      : null;
    const prev = products.hasPrevPage
      ? `http://localhost:8080/api/products?page=${products.prevPage}`
      : null;

    if (!products.docs.length && products.totalDocs === 0) {
      return res.status(404).send({ msg: "Products not found" });
    }

    res.status(200).json({
      payload: products.docs,
      info: {
        count: products.totalDocs,
        page: products.page,
        limit: products.limit,
        totalPages: products.totalPages,
        nextLink: next,
        prevLink: prev,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      },
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await service.getProductsById(id);
    if (!productById) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).json(productById);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const addProducts = async (req, res) => {
  try {
    const newProduct = await service.addProducts(req.body);
    if (!newProduct) {
      return res.status(404).send({ msg: "Product could not be added" });
    }
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const updateProduct = req.body;
    const { id } = req.params;
    const prodUpdate = await service.updateProducts(id, updateProduct);
    if (!updateProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).json(prodUpdate);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.deleteProducts(id);
    if (!deleteProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
