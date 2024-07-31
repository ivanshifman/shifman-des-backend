import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import { passportCall } from "../utils/passportCall.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/userFieldsValidator.js";
import { authenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post(
  "/register",
  authenticated,
  validateRegister,
  passportCall("register"),
  controller.registerResponse
);

userRouter.post(
  "/login",
  validateLogin,
  passportCall("login"),
  controller.loginResponse
);

userRouter.get("/current", passportCall("current"), controller.current);

userRouter.get("/logout", passportCall("current"), controller.logOut);

export default userRouter;