import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  code: Joi.string().trim().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().trim().required(),
});
