import { Router } from "express";
import { passportCall } from "../utils/passportCall.js";
import { authorizeCart } from "../middlewares/cartValidator.js";
import { getCartIdView } from "../controllers/cartIdView.controllers.js";

const cartsIdViewRouter = Router();

cartsIdViewRouter.get(
  "/:cartId",
  passportCall("current"),
  authorizeCart,
  getCartIdView
);

export default cartsIdViewRouter;

