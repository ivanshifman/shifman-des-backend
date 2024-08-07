import Joi from 'joi';

export const updateProductSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  code: Joi.string().trim().optional(),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: Joi.string().trim().optional(),
}).or('title', 'description', 'code', 'price', 'stock', 'category');

