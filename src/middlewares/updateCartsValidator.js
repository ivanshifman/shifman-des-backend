export const updateCartsValidator = (req, res, next) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.sendUserError(404, { message: "Invalid properties" });
  }

  const isValid = products.every((product) => {
    const validKeys = ["quantity", "product"];
    const extraKeys = Object.keys(product).filter(
      (key) => !validKeys.includes(key)
    );

    if (extraKeys.length > 0) {
      return false;
    }

    return product.product && product.quantity;
  });

  if (!isValid) {
    return res.sendUserError(404, { message: "Invalid properties" });
  } else {
    next();
  }
};
