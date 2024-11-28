import * as service from "../services/product.services.js";

export const getProducts = async (req, res) => {
  try {
    const { page, limit, category, sort } = req.query;
    const products = await service.getProducts(page, limit, category, sort);
    const createLink = (page) => {
      let baseLink = `http://localhost:8080/api/products?page=${page}`;
      const params = [];
      if (limit) params.push(`limit=${limit}`);
      if (category) params.push(`category=${category}`);
      if (sort) params.push(`sort=${sort}`);
      if (params.length > 0) baseLink += `&${params.join("&")}`;
      return baseLink;
    };

    const next = products.hasNextPage ? createLink(products.nextPage) : null;
    const prev = products.hasPrevPage ? createLink(products.prevPage) : null;

    if (!products.docs.length && products.totalDocs === 0) {
      return res.sendUserError(404, { msg: "Products not found" });
    }

    if (page > products.totalPages) {
      return res.sendUserError(404, { msg: "Page not found" });
    }
    res.sendSuccess(200, {
      status: "success",
      payload: products.docs,
      info: {
        count: products.totalDocs,
        limit: products.limit,
        page: products.page,
        totalPages: products.totalPages,
        nextLink: next,
        prevLink: prev,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      },
    });
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await service.getProductsById(id);
    if (!productById) {
      return res.sendUserError(404, { msg: "Product not found" });
    }
    res.sendSuccess(200, productById);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const addProducts = async (req, res) => {
  try {
    const newProduct = await service.addProducts(req.body);
    if (!newProduct) {
      return res.sendUserError(400, { msg: "Product could not be added" });
    }
    res.sendSuccess(200, newProduct);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const updateProducts = async (req, res) => {
  try {
    const updateProduct = req.body;
    const { id } = req.params;
    const prodUpdate = await service.updateProducts(id, updateProduct);
    if (!updateProduct) {
      return res.sendUserError(400, { msg: "Product not found" });
    }
    res.sendSuccess(200, prodUpdate);
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.deleteProducts(id);
    
    if (!deleteProduct) {
      return res.sendUserError(404, { msg: "Product not found" });
    }
    res.sendSuccess(200, deleteProduct);
  } catch (error) {
    res.sendServerError(500, error);
  }
};
