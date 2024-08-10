import UserDao from "../daos/mongoDB/user.dao.js";
import CartDao from "../daos/mongoDB/cart.dao.js";
import { comparePassword } from "../utils/hashFunctions.js";
import { smsService } from "./sms.services.js";
import { mailService } from "./mail.services.js";

const userDao = new UserDao();
const cartDao = new CartDao();

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
    const { email, role, phone, countryCode } = user;
    const existUser = await getUserByEmail(email);

    if (!existUser) {
      if (role) {
        user.role = role.toLowerCase();
      } else {
        user.role = "user";
      }

      if (user.role === "user") {
        const newCart = await cartDao.addCarts();
        user.cart_id = newCart._id;
      }

      await smsService.validateAndRegisterUser(user);
      const newUser = await userDao.register(user);

      await smsService.sendSms(phone, "Thanks for registering", countryCode);
      if (user.role === "user") {
        await mailService.sendMail({
          to: email,
          subject: "Welcome to Shifman Ecommerce",
          type: "register",
        });
      }

      return newUser;
    } else {
      return null;
    }
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
