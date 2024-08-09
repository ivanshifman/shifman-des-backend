import ProductDao from "../daos/mongoDB/product.dao.js";

const productDao = new ProductDao();

export const getProducts = async (page, limit, category, sort) => {
  try {
    return await productDao.getProducts(page, limit, category, sort);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsById = async (id) => {
  try {
    const prod = await productDao.getProductsById(id);
    if (!prod) return null;
    else return prod;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProducts = async (product) => {
  try {
    const newProduct = await productDao.addProducts(product);
    if (!newProduct) return null;
    else return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProducts = async (id, product) => {
  try {
    const updateProd = await productDao.updateProducts(id, product);
    if (!updateProd) return null;
    else return "Updated product";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProducts = async (id) => {
  try {
    const deleteProd = await productDao.deleteProducts(id);
    if (!deleteProd) return null;
    else return "Product deleted";
  } catch (error) {
    throw new Error(error.message);
  }
};
