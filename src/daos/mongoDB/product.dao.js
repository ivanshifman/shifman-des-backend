import { ProductModel } from "./models/product.model.js";

class ProductDao {
  async getProducts(page = 1, limit = 10, category, sort) {
    try {
      const filter = category ? { category: category } : {};
      let sortOrder = {};
      if (sort)
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      const products = await ProductModel.paginate(filter, {
        page,
        limit,
        sort: sortOrder,
      });

      const sanitizedProducts = products.docs.map((product) => ({
        _id: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        code: product.code,
        price: product.price,
        stock: product.stock,
      }));

      return {
        ...products,
        docs: sanitizedProducts,
      };
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
      const newProduct = await ProductModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProducts(id, product) {
    try {
      return await ProductModel.findByIdAndUpdate(id, product, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProducts(id) {
    try {
      const deleteProd = await ProductModel.findByIdAndDelete(id);
      if (!deleteProd) {
        return null;
      }
      return "Product deleted";
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductDao;
