import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(10).max(13).required().messages({
    'string.base': 'Number is not valid',
    'string.min': 'Number should have at least {#limit} characters',
    'string.max': 'Number should have at most {#limit} characters',
    'any.required': 'Number is required',
  }),
  email: Joi.string().email().min(3).max(30).optional().messages({
    'string.email': 'Email is not valid',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(10).max(13).messages({
    'string.base': 'Number is not valid',
    'string.min': 'Number should have at least {#limit} characters',
    'string.max': 'Number should have at most {#limit} characters',
  }),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
