const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const ingredient = require("../../models/ingredient");
const { errorCreator } = require("../helpers/helper");
const validate = require("../validations/ingredientValidations");

const {
  validation,
  unauthorized,
  ingredientNotFound,
  unknown
} = require("../constants/errorCodes");

exports.viewAllIngredients = async (req, res) => {
  try {
    const ingredients = await ingredient.find();

    if (ingredients.length === 0)
      return res
        .status(400)
        .send(errorCreator(ingredientNotFound, "No ingredients found"));

    return res.json({
      data: ingredients
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown error"));
  }
};

exports.viewIngredientById = async (req, res) => {
  try {
    const requestedIngredient = await ingredient.findById(
      req.body.ingredientId
    );
    if (!requestedIngredient)
      return res
        .status(400)
        .send(errorCreator(ingredientNotFound, "Ingredient not found"));
    return res.json({
      data: requestedIngredient
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const isValid = validate.createIngredientValidation(req.body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));

    const newIngredient = await ingredient.create(req.body);
    return res.json({
      msg: "Ingredient created successfully",
      data: newIngredient
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    const updatedIngredient = await ingredient.findById(req.body.ingredientId);

    if (!updatedIngredient)
      return res
        .status(400)
        .send(errorCreator(ingredientNotFound, "Ingredient not found"));

    const { name, stock, unit, type, origin, locale } = req.body;
    let {
      updatedStock,
      updatedUnit,
      updatedType,
      updatedOrigin,
      updatedLocale
    } = "";

    if (name)
      return res
        .status(400)
        .send(errorCreator(validation, '"name" is not allowed'));

    if (!stock) updatedStock = updatedIngredient.stock;
    else updatedStock = stock;
    if (!unit) updatedUnit = updatedIngredient.unit;
    else updatedUnit = unit;
    if (!type) updatedType = updatedIngredient.type;
    else updatedType = type;
    if (!origin) updatedOrigin = updatedIngredient.origin;
    else updatedOrigin = origin;
    if (!locale) updatedLocale = updatedIngredient.locale;
    else updatedLocale = locale;

    if (updatedLocale) {
      if (updatedOrigin) {
        var body = {
          stock: updatedStock,
          unit: updatedUnit,
          type: updatedType,
          origin: updatedOrigin,
          locale: updatedLocale
        };
      } else
        body = {
          stock: updatedStock,
          unit: updatedUnit,
          type: updatedType,
          locale: updatedLocale
        };
    } else
      body = {
        stock: updatedStock,
        unit: updatedUnit,
        type: updatedType
      };
    const isValid = validate.updateIngredientValidation(body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));

    await ingredient.findByIdAndUpdate({ _id: req.body.ingredientId }, body);

    return res.json({
      data: "Ingredient updated successfully"
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    const deletedIngredient = await ingredient.findByIdAndRemove(
      req.body.ingredientId
    );

    if (!deletedIngredient)
      return res
        .status(400)
        .send(errorCreator(ingredientNotFound, "Ingredient not found"));

    return res.json({
      msg: "Ingredient deleted successfully",
      data: deletedIngredient
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.stock = async (req, res) => {
  try {
    const SerialPort = require("serialport");
    const Readline = require("@serialport/parser-readline");
    const port = new SerialPort("\\\\.\\COM3", { baudRate: 9600 });
    const parser = port.pipe(new Readline({ delimiter: "\n" }));
    // Read the port data
    port.on("open", () => {
      console.log("serial port open");
    });
    parser.on("data", data => {
      console.log("got word from arduino:", data);
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};
