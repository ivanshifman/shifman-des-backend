import Joi from "joi";
import { isValidNumber } from 'libphonenumber-js';

const validatePhone = (phoneNumber, helpers) => {
  if (!isValidNumber(phoneNumber)) { 
    return helpers.error('any.invalid');
  }
  return phoneNumber;
};

const gmailRegex = /^[^\s@]+@gmail\.com$/;

export const registerSchema = Joi.object({
  first_name: Joi.string().trim().min(3).required().messages({
    "string.base": '"first_name" should be a type of text',
    "string.empty": '"first_name" is required and cannot be an empty field',
    "string.min": '"first_name" should have a minimum length of 3 characters',
    "any.required": '"first_name" is a required field',
  }),
  last_name: Joi.string().trim().min(3).required().messages({
    "string.base": '"last_name" should be a type of text',
    "string.empty": '"last_name" is required and cannot be an empty field',
    "string.min": '"last_name" should have a minimum length of 3 characters',
    "any.required": '"last_name" is a required field',
  }),
  email: Joi.string().trim().email().pattern(gmailRegex).required().messages({
    "string.base": '"email" should be a type of text',
    "string.email": '"email" must be a valid email address',
    "string.pattern.base": '"email" must be a Gmail address',
    "any.required": '"email" is a required field',
  }),
  password: Joi.string().trim().min(5).required().messages({
    "string.base": '"password" should be a type of text',
    "string.empty": '"password" is required and cannot be an empty field',
    "string.min": '"password" should have a minimum length of 5 characters',
    "any.required": '"password" is a required field',
  }),
  age: Joi.number().integer().min(0).required().messages({
    "number.base": '"age" should be a type of number',
    "number.integer": '"age" must be an integer',
    "number.min": '"age" must be a non-negative number',
    "any.required": '"age" is a required field',
  }),
  role: Joi.string().valid("admin", "user").optional().messages({
    "string.base": '"role" should be a type of text',
    "string.valid": '"role" must be either "admin" or "user"',
  }),
  phone: Joi.string()
    .custom(validatePhone, 'phone validation')
    .required()
    .messages({
      "string.base": '"phone" should be a type of text',
      "any.invalid": '"phone" must be a valid phone number',
      "any.required": '"phone" is a required field',
    }),
  countryCode: Joi.string().length(2).uppercase().required().messages({
    "string.base": '"countryCode" should be a type of text',
    "string.length": '"countryCode" must be exactly 2 characters long',
    "string.uppercase": '"countryCode" must be in uppercase',
    "any.required": '"countryCode" is a required field',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().pattern(gmailRegex).required().messages({
    "string.base": '"email" should be a type of text',
    "string.email": '"email" must be a valid email address',
    "string.pattern.base": '"email" must be a Gmail address',
    "any.required": '"email" is a required field',
  }),
  password: Joi.string().trim().min(5).required().messages({
    "string.base": '"password" should be a type of text',
    "string.empty": '"password" is required and cannot be an empty field',
    "string.min": '"password" should have a minimum length of 5 characters',
    "any.required": '"password" is a required field',
  }),
});
