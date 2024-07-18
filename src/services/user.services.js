import UserDao from "../daos/mongoDB/user.dao.js";
import { comparePassword } from "../utils/hashFunctions.js";

const userDao = new UserDao();

export const getUserById = async (id) => {
  try {
    const getUserById = await userDao.getById(id);
    if (!getUserById) return null;
    else return getUserById;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const getUserByEmail = await userDao.getByEmail(email);
    if (!getUserByEmail) return null;
    else return getUserByEmail;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (user) => {
  try {
    const { email } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      const newUser = await userDao.register(user);
      return newUser;
    } else return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const userExist = await getUserByEmail(email);
    if (!userExist) return null;
    const passValid = await comparePassword(password, userExist.password);
    if (!passValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error.message);
  }
};
