const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const order = require("../../models/order");
const product = require("../../models/product");
const users = require("../../models/user");
const ingredient = require("../../models/ingredient");
const { errorCreator } = require("../helpers/helper");
const validate = require("../validations/orderValidations");
const {
  validation,
  unauthorized,
  outOfStock,
  productNotFound,
  orderNotFound,
  usertNotFound,
  unknown
} = require("../constants/errorCodes");
var moment = require("moment");
var moment = require("moment");
moment().format();

exports.viewAllOrders = async (req, res) => {
  try {
    const orders = await order.find();

    if (orders.length === 0)
      return res
        .status(400)
        .send(errorCreator(orderNotFound, "No orders found"));

    return res.json({
      data: orders
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown error"));
  }
};

exports.viewOrderById = async (req, res) => {
  try {
    var requestedOrder = await order.findById(req.body.orderId);
    if (!requestedOrder)
      return res
        .status(400)
        .send(errorCreator(orderNotFound, "Order not found"));

    var products = [];

    for (let i = 0; i < requestedOrder.products.length; i += 1) {
      const requestedProduct = await product.findById(
        requestedOrder.products[i].product
      );
      products.push({
        product: requestedProduct.name,
        quantity: requestedOrder.products[i].quantity
      });
    }

    return res.json({
      data: requestedOrder
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.createOrder = async (req, res) => {
  try {
    const isValid = validate.createOrderValidation(req.body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));

    const user = await users.findById(req.body.userId);
    if (!user)
      return res
        .status(400)
        .send(errorCreator(usertNotFound, "User not found"));

    if (req.body.products) {
      for (let i = 0; i < req.body.products.length; i += 1) {
        const requestedProduct = await product.findById(
          req.body.products[i].product
        );
        if (!requestedProduct)
          return res
            .status(400)
            .send(errorCreator(productNotFound, "Product not found"));
      }
    }

    if (req.body.products) {
      for (let i = 0; i < req.body.products.length; i += 1) {
        const requestedProduct = await product.findById(
          req.body.products[i].product
        );
        const qua = req.body.products[i].quantity;
        for (let i = 0; i < requestedProduct.recipe.length; i += 1) {
          const requestedIngredient = await ingredient.findById(
            requestedProduct.recipe[i].ingredient
          );
          if (
            qua * requestedProduct.recipe[i].quantity >
            requestedIngredient.stock
          ) {
            return res
              .status(400)
              .send(
                errorCreator(
                  outOfStock,
                  { requestedProduct } + " is Out of stock"
                )
              );
          }
        }
      }
    }

    const newOrder = await order.create(req.body);
    if (req.body.products) {
      for (let i = 0; i < req.body.products.length; i += 1) {
        const requestedProduct = await product.findById(
          req.body.products[i].product
        );
        const qua = req.body.products[i].quantity;
        for (let i = 0; i < requestedProduct.recipe.length; i += 1) {
          const requestedIngredient = await ingredient.findById(
            requestedProduct.recipe[i].ingredient
          );
          await ingredient.findByIdAndUpdate(requestedIngredient.id, {
            stock:
              requestedIngredient.stock -
              qua * requestedProduct.recipe[i].quantity
          });
        }
      }
    }
    return res.json({
      msg: "Order created successfully",
      data: newOrder
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await order.findById(req.body.orderId);

    if (!updatedOrder)
      return res
        .status(400)
        .send(errorCreator(orderNotFound, "Order not found"));

    const { status, start, products, price, finish, userId, cookId } = req.body;

    if (start)
      return res
        .status(400)
        .send(errorCreator(validation, '"start" is not allowed'));

    if (products)
      return res
        .status(400)
        .send(errorCreator(validation, '"products" is not allowed'));

    if (price)
      return res
        .status(400)
        .send(errorCreator(validation, '"price" is not allowed'));

    if (userId)
      return res
        .status(400)
        .send(errorCreator(validation, '"userId" is not allowed'));

    if (cookId) {
      const cook = await user.findById(cookId);
      if (!cook)
        return res
          .status(400)
          .send(errorCreator(usertNotFound, "User not found"));
    } else
      return res
        .status(400)
        .send(errorCreator(validation, '"cookId" is required'));

    if (status) {
      if (finish) {
        body = {
          status: status,
          finish: finish,
          cookId: cookId
        };
      } else {
        body = {
          status: status,
          cookId: cookId
        };
      }
    } else {
      if (finish) {
        body = {
          finish: finish,
          cookId: cookId
        };
      } else
        body = {
          cookId: cookId
        };
    }

    const isValid = validate.updateOrderValidation(body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));

    await order.findByIdAndUpdate({ _id: req.body.orderId }, body);

    return res.json({
      data: "Order updated successfully"
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await order.findByIdAndRemove(req.body.orderId);

    if (!deletedOrder)
      return res
        .status(400)
        .send(errorCreator(orderNotFound, "Order not found"));

    return res.json({
      msg: "Order deleted successfully",
      data: deletedOrder
    });
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.log = async (req, res) => {
  try {
    var obj = {
      table: []
    };

    var json = JSON.stringify(obj);
    var fs = require("fs");
    fs.readFile("log.json", "utf8", function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        obj.table.push({
          id: req.body.orderId,
          price: req.body.price,
          begin: req.body.date,
          finish: req.body.finish,
          products: req.body.products
        });
        json = JSON.stringify(obj);
        fs.writeFile("log.json", json, "utf8", function(error) {
          if (error) {
            console.log("[write auth]: " + err);
            return res.status(400).send(errorCreator(unknown, "Unknown"));
          } else {
            console.log("[write auth]: success");
            return res.json({
              msg: "Logged successfully"
            });
          }
        });
      }
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.diff = async (req, res) => {
  try {
    const orders = req.body.orders;
    const diff = [];
    const now = moment();
    for (let i in orders) {
      console.log(orders[i]);
      console.log(
        moment(now).diff(
          moment(orders[i].start).add(orders[i].duration, "minutes")
        )
      );
      if (orders[i].finish) {
        if (
          moment(now).diff(
            moment(orders[i].start).add(orders[i].duration, "minutes")
          ) >= 0
        ) {
          diff.push({
            id: orders[i]._id,
            timeDiff: moment(now).diff(
              moment(orders[i].start).add(orders[i].duration, "minutes")
            )
          });
        } else diff.push({ id: orders[i]._id, timeDiff: 0 });
      } else diff.push({ id: orders[i]._id, timeDiff: 0 });
    }
    console.log(diff);
    return res.json({
      data: diff
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown error"));
  }
};
