import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import { passportCall } from "../utils/passportCall.js";
import { authenticated } from "../middlewares/auth.js";
import { validator } from "../middlewares/validatorFieldsJoi.js";
import {
  loginSchema,
  registerSchema,
} from "../dtos/schemasJoi/userFields.dto.js";

const userRouter = Router();

userRouter.post(
  "/register",
  authenticated,
  validator(registerSchema),
  passportCall("register"),
  controller.registerResponse
);

userRouter.post(
  "/login",
  validator(loginSchema),
  passportCall("login"),
  controller.loginResponse
);

userRouter.get("/current", passportCall("current"), controller.current);

userRouter.get("/logout", passportCall("current"), controller.logOut);

export default userRouter;
