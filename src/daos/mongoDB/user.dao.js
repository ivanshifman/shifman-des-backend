import { UserModel } from "./models/user.model.js";

class UserDao {
  async register(user) {
    try {
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
