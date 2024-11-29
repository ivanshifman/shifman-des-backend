import { generateToken } from "../utils/jwtFunctions.js";

export const registerResponse = (req, res) => {
  try {
    res.sendSuccess(201, { message: req.user });
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const loginResponse = async (req, res) => {
  try {
    const token = generateToken({
      _id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    });
    res.cookie("access_token", token, { httpOnly: true, maxAge: 300000 });
    res.sendSuccess(200, { message: "Session started", token });
  } catch (error) {
    res.sendServerError(500, error);
  }
};

export const logOut = (req, res) => {
  res.clearCookie("access_token");
  res.sendSuccess(200, { message: "Session closed" });
};

export const current = async (req, res) => {
  try {
    const user = req.user;
    const {
      _id,
      first_name,
      last_name,
      email,
      role,
      age,
      cart_id,
      phone,
      countryCode,
    } = user;

    res.sendSuccess(200, {
      message: "Welcome",
      user: {
        _id,
        first_name,
        last_name,
        email,
        role,
        age,
        phone,
        countryCode,
        cart_id,
      },
    });
  } catch (error) {
    res.sendServerError(500, error);
  }
};
