import mongoose from "mongoose";

export const authorizeCart = (req, res, next) => {
  if (!req.user || !req.user.cart_id) {
    return res.sendUserError(400, { message: "User cart ID is missing" });
  }

  if (!mongoose.Types.ObjectId.isValid(req.user.cart_id)) {
    return res.sendUserError(400, { message: "User cart ID is not a valid ObjectId" });
  }

  const userCartId = req.user.cart_id.toString();
  const { cartId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.sendUserError(400, { message: "Cart ID parameter is not valid" });
  }

  if (userCartId === cartId) {
    return next();
  }

  res.sendUserError(403, { message: "You do not have access to this cart" });
};
