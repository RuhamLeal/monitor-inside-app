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
    .min(4)
    .required()
    .messages({
      'string.min': 'Insira uma senha com mais de 3 dígitos',
      'string.empty': requiredText,
      'any.required': requiredText,
    }),
});
