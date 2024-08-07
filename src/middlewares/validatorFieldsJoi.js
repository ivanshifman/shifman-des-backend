export const validator = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      return res.sendUserError(400, {
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
};
