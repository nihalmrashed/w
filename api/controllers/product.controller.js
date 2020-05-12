const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const product = require("../../models/product");
const ingredient = require("../../models/ingredient");
const { errorCreator } = require("../helpers/helper");
const validate = require("../validations/productValidations");

const {
  validation,
  unauthorized,
  ingredientNotFound,
  productNotFound,
  unknown
} = require("../constants/errorCodes");

exports.viewAllProducts = async (req, res) => {
  try {
    const products = await product.find();

    if (products.length === 0)
      return res
        .status(400)
        .send(errorCreator(productNotFound, "No products found"));

    return res.json({
      data: products
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown error"));
  }
};

exports.viewProductById = async (req, res) => {
  try {
    var requestedProduct = await product.findById(req.body.productId);
    if (!requestedProduct)
      return res
        .status(400)
        .send(errorCreator(productNotFound, "Product not found"));

    var recipe = [];

    for (let i = 0; i < requestedProduct.recipe.length; i += 1) {
      const requestedIngredient = await ingredient.findById(
        requestedProduct.recipe[i].ingredient
      );
      recipe.push({
        ingredient: requestedIngredient.name,
        quantity: requestedProduct.recipe[i].quantity
      });
    }

    return res.json({
      data: requestedProduct
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.createProduct = async (req, res) => {
  try {
    const isValid = validate.createProductValidation(req.body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));

    if (req.body.recipe) {
      for (let i = 0; i < req.body.recipe.length; i += 1) {
        const requestedIngredient = await ingredient.findById(
          req.body.recipe[i].ingredient
        );
        if (!requestedIngredient)
          return res
            .status(400)
            .send(errorCreator(ingredientNotFound, "Ingredient not found"));
      }
    }

    const newProduct = await product.create(req.body);
    return res.json({
      msg: "Product created successfully",
      data: newProduct
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await product.findById(req.body.productId);

    if (!updatedProduct)
      return res
        .status(400)
        .send(errorCreator(productNotFound, "Product not found"));

    const { name, price, cuisine, description, recipe, image, time } = req.body;
    let {
      updatedPrice,
      updatedCuisine,
      updatedDescription,
      updatedRecipe,
      updatedImage,
      updatedTime
    } = "";

    if (name)
      return res
        .status(400)
        .send(errorCreator(validation, '"name" is not allowed'));

    if (!price) updatedPrice = updatedProduct.price;
    else updatedPrice = price;
    if (!cuisine) updatedCuisine = updatedProduct.cuisine;
    else updatedCuisine = cuisine;
    if (!description) updatedDescription = updatedProduct.description;
    else updatedDescription = description;
    if (!image) updatedImage = updatedProduct.image;
    else updatedImage = image;
    if (!time) updatedTime = updatedProduct.time;
    else updatedTime = time;
    if (recipe) updatedRecipe = recipe;

    if (updatedRecipe) {
      if (updatedDescription) {
        var body = {
          price: updatedPrice,
          cuisine: updatedCuisine,
          description: updatedDescription,
          recipe: updatedRecipe,
          image: updatedImage,
          time: updatedTime
        };
      } else
        body = {
          price: updatedPrice,
          cuisine: updatedCuisine,
          recipe: updatedRecipe,
          image: updatedImage,
          time: updatedTime
        };

      for (let i = 0; i < updatedRecipe.length; i += 1) {
        const requestedIngredient = await ingredient.findById(
          updatedRecipe[i].ingredient
        );
        if (!requestedIngredient)
          return res
            .status(400)
            .send(errorCreator(ingredientNotFound, "Ingredient not found"));
      }
    } else
      body = {
        price: updatedPrice,
        cuisine: updatedCuisine,
        image: updatedImage,
          time: updatedTime
      };

    const isValid = validate.updateProductValidation(body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));

    await product.findByIdAndUpdate({ _id: req.body.productId }, body);

    return res.json({
      data: "Product updated successfully"
    });
  } catch (exception) {
    console.log(exception)
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndRemove(req.body.productId);

    if (!deletedProduct)
      return res
        .status(400)
        .send(errorCreator(productNotFound, "Product not found"));

    return res.json({
      msg: "Product deleted successfully",
      data: deletedProduct
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};
