import { generateToken } from "../utils/jwtFunctions.js";

export const registerResponse = (req, res) => {
  try {
    res.status(201).send({ message: "User register" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
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
    res.send({ message: "Session started", token: token });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const logOut = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Session closed" });
};

export const current = async (req, res) => {
  try {
    const user = req.user;
    const { _id, first_name, last_name, email, role, age, cart_id } = user;

    res.json({
      message: "Welcome",
      user: {
        _id,
        first_name,
        last_name,
        email,
        role,
        age,
        cart_id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
