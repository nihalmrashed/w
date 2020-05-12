const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  createProductValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      price: Joi.number().required(),
      cuisine: Joi.string().required(),
      description: Joi.string(),
      recipe: Joi.array().items(Joi.object({ingredient: Joi.objectId(), quantity:Joi.number()})),
      image: Joi.string().required(),
      time: Joi.number().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateProductValidation: request => {
    const updateSchema = {
      price: Joi.number(),
      cuisine: Joi.string(),
      description: Joi.string(),
      recipe: Joi.array().items(Joi.object({ingredient: Joi.objectId(), quantity:Joi.number()})),
      image: Joi.string(),
      time: Joi.number()
    };

    return Joi.validate(request, updateSchema);
  }
};
