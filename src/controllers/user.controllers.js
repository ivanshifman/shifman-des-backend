import { generateToken } from "../utils/jwtFunctions.js";

export const registerResponse = (req, res) => {
  try {
    res.status(201).send("User register");
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
    res.cookie("access_token", token, { httpOnly: true, maxAge: 600000 });
    res.send({ message: "Session started", token: token });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const current = async (req, res) => {
  res.json({ message: "Bienvenido", user: req.user });
};
