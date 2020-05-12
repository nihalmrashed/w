const Joi = require("joi");

module.exports = {
  createUserValidation: request => {
    const createSchema = {
      email: Joi.string().required(),
      password: Joi.number().required(),
      type: Joi.string().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateUserValidation: request => {
    const updateSchema = {
      password: Joi.number().required(),
    };

    return Joi.validate(request, updateSchema);
  }
};
