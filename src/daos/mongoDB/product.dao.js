import { ProductModel } from "./models/product.model.js";

class ProductDao {
  async getProducts(page = 1, limit = 10, category, sort) {
    try {
      const filter = category ? { category: category } : {};
      let sortOrder = {};
      if (sort)
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      return await ProductModel.paginate(filter, {
        page,
        limit,
        sort: sortOrder,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductsById(id) {
    try {
      const productById = await ProductModel.findById(id);
      if (!productById) throw new Error("Product not found");
      return productById;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProducts(product) {
    try {
      await ProductModel.create(product);
      return "Product added";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProducts(id, product) {
    try {
      await ProductModel.findByIdAndUpdate(id, product, { new: true });
      return "Updated product";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProducts(id) {
    try {
      await ProductModel.findByIdAndDelete(id);
      return "Product deleted";
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductDao;
