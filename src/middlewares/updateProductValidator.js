export const updateProductValidator = (req, res, next) => {
  const allowedKeys = [
    "title",
    "description",
    "code",
    "price",
    "stock",
    "category",
  ];
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(404).json({ msg: "Invalid body: no fields to update" });
  }

  const { title, description, code, price, stock, category } = body;
  if (
    (title && typeof title !== "string") ||
    (description && typeof description !== "string") ||
    (code && typeof code !== "string") ||
    (category && typeof category !== "string") ||
    (price && typeof price !== "number") ||
    (stock && typeof stock !== "number")
  ) {
    return res.status(404).json({ msg: "Invalid body: invalid data types" });
  }

  const invalidKeys = Object.keys(body).filter(
    (key) => !allowedKeys.includes(key)
  );
  if (invalidKeys.length > 0) {
    return res.status(404).json({
      msg: "Invalid body: invalid keys found",
    });
  }

  const emptyKeys = Object.keys(body).filter(
    (key) => typeof body[key] === "string" && !body[key].trim()
  );
  if (emptyKeys.length > 0) {
    return res.status(404).json({
      msg: "Invalid body: fields cannot be empty",
    });
  }
  
  else next();
};
