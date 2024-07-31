export const productValidator = (req, res, next) => {
  const { title, description, code, price, stock, category } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.sendUserError(404, {
      message: "Invalid body: missing required fields",
    });
  }

  const allowedKeys = [
    "title",
    "description",
    "code",
    "price",
    "stock",
    "category",
  ];
  const additionalKeys = Object.keys(req.body).filter(
    (key) => !allowedKeys.includes(key)
  );
  if (additionalKeys.length > 0) {
    return res.sendUserError(404, {
      message: "Invalid body: additional keys found",
    });
  }

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof code !== "string" ||
    typeof category !== "string" ||
    typeof price !== "number" ||
    typeof stock !== "number" ||
    stock < 0 ||
    price <= 0
  ) {
    return res.sendUserError(404, {
      message: "Invalid body: invalid data types",
    });
  }

  if (
    title.trim() === "" ||
    description.trim() === "" ||
    code.trim() === "" ||
    category.trim() === ""
  ) {
    return res.sendUserError(404, {
      message: "Invalid body: fields cannot be empty",
    });
  } else next();
};
