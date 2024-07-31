export const authorizeCart = (req, res, next) => {
  const userCartId = req.user.cart_id.toString();
  const { cartId } = req.params;

  if (userCartId === cartId) {
    return next();
  }
  res.sendUserError(403, { message: "You do not have access to this cart" });
};
