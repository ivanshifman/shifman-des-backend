import mongoose from "mongoose";

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendUserError(400, { message: "Invalid product ID" });
  }
  next();
};

export default validateId;
