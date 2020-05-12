const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      "Dairy Product",
      "Dressing",
      "Fish",
      "Fruit",
      "Grain",
      "Liquid",
      "Meat",
      "Poultry",
      "Powder",
      "Vegetable",
      "Other"
    ],
    required: true
  },
  origin: String,
  locale: String
});

module.exports = ingredient = mongoose.model("ingredient", ingredientSchema);
