const Joi = require("joi");

module.exports = {
  createOrderValidation: request => {
    const createSchema = {
      start: Joi.date().required(),
      products: Joi.array().items(Joi.object({product: Joi.objectId(),name: Joi.string(), quantity:Joi.number().min(1), itemSubTotal:Joi.number().min(1)})).required(),
      price: Joi.number().required(),
      status: Joi.string().required(),
      finish: Joi.date(),
      duration: Joi.number().required(),
      userId: Joi.objectId().required(),
      cookId: Joi.objectId()
    };

    return Joi.validate(request, createSchema);
  },

  updateOrderValidation: request => {
    const updateSchema = {
      status: Joi.string(),
      finish: Joi.date(),
      cookId: Joi.objectId().required()
    };

    return Joi.validate(request, updateSchema);
  }
};
