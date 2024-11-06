export const authorizeCart = (req, res, next) => {
  if (!req.user || !req.user.cart_id) {
    return res.sendUserError(400, { message: "User cart ID is missing" });
  }

  const userCartId = req.user.cart_id.toString();
  const { cartId } = req.params;

  if (userCartId === cartId) {
    return next();
  }
  res.sendUserError(403, { message: "You do not have access to this cart" });
};