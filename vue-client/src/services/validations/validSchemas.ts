import Joi from 'joi';

export const requiredText = 'Os campos não podem estar vazios';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email inválido',
      'string.empty': requiredText,
      'any.required': requiredText,
    })
    .required(),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': requiredText,
      'any.required': requiredText,
    }),
});

export const userFormSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .messages({
      'string.min': 'Nome precisa ter mais de 4 digitos',
      'string.empty': requiredText,
      'any.required': requiredText,
    })
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email inválido',
      'string.empty': requiredText,
      'any.required': requiredText,
    })
    .required(),

  password: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'Password precisa ter mais de 3 digitos',
      'string.empty': requiredText,
      'any.required': requiredText,
    }),

  admin: Joi.boolean(),
});
