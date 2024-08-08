import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.SECRET_KEY_JWT, {
    expiresIn: "5m",
  });
};