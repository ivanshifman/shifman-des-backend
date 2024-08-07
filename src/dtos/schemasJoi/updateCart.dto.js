import Joi from 'joi';

const productInCartSchema = Joi.object({
  product: Joi.string().trim().required().messages({
    'string.base': '"product" should be a type of text',
    'string.empty': '"product" cannot be an empty field',
    'any.required': '"product" is a required field',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': '"quantity" should be a type of number',
    'number.integer': '"quantity" must be an integer',
    'number.min': '"quantity" must be greater than or equal to 1',
    'any.required': '"quantity" is a required field',
  }),
});

export const updateCartsSchema = Joi.object({
  products: Joi.array().items(productInCartSchema).required().messages({
    'array.base': '"products" should be an array',
    'array.includes': '"products" must contain valid product objects',
    'any.required': '"products" is a required field',
  }),
});
