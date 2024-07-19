import CartDao from "./cart.dao.js";
import { UserModel } from "./models/user.model.js";

const cartDao = new CartDao();

class UserDao {
  async register(user) {
    try {
      const newCart = await cartDao.addCarts();
      user.cart_id = newCart._id;
      return await UserModel.create(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserDao;
