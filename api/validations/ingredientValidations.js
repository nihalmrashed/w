const Joi = require("joi");

module.exports = {
  createIngredientValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      stock: Joi.number().required(),
      unit: Joi.string().required(),
      type: Joi.string().required(),
      origin: Joi.string(),
      locale: Joi.string(),
    };

    return Joi.validate(request, createSchema);
  },

  updateIngredientValidation: request => {
    const updateSchema = {
      stock: Joi.number(),
      unit: Joi.string(),
      type: Joi.string(),
      origin: Joi.string(),
      locale: Joi.string(),
    };

    return Joi.validate(request, updateSchema);
  }
};
