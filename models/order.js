const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  start: {
    type: Date,
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      itemSubTotal: {
        type: Number,
        required: true
      }
    }
  ],
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  finish: { type: Date },
  duration: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  cookId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  timeDiff: {
    type: Number,
    default: 0
  },
  timeStatus: {
    type: String,
    default: "pending"
  }
});

module.exports = order = mongoose.model("order", orderSchema);
