const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cuisine: {
    type: String,
    enum: [
      "Asian",
      "Bakery and Cakes",
      "Beverage",
      "Breakfast",
      "Burgers",
      "Crepes and Waffles",
      "Chinese",
      "Desserts",
      "Fast Food",
      "Greek",
      "Grills",
      "Healthy",
      "Indian",
      "International",
      "Italian",
      "Japanese",
      "Lebanese",
      "Mexican",
      "Oriental",
      "Pasta",
      "Pies",
      "Pizza",
      "Salads",
      "Sandwiches",
      "Seafood",
      "Seyami",
      "Shawerma",
      "Thai",
      "Wraps"
    ],
    required: true
  },
  description: String,
  recipe: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: "ingredient"
      },
      quantity: Number
    }
  ],
  image: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = product = mongoose.model("product", productSchema);
