const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const user = require("../../models/user");
const { errorCreator } = require("../helpers/helper");
const validate = require("../validations/userValidations");

const {
  validation,
  alreadyRegistered,
  usertNotFound,
  wrongPassword,
  unauthorized,
  unknown
} = require("../constants/errorCodes");

exports.login = async (req, res) => {
  try {
    const users = await user.findOne({ email: req.body.email });
    if (users) {
      if (users.password === req.body.password)
        return res.json({
          msg: "You've logged in successfully",
          data: users
        });
      else
        return res
          .status(400)
          .send(errorCreator(wrongPassword, "Wrong Password"));
    } else
      return res.status(400).send(errorCreator(usertNotFound, "No user found"));
  } catch (exception) {
    return res.status(400).send(errorCreator(unknown, "Unknown error"));
  }
};

exports.register = async (req, res) => {
  try {
    const isValid = validate.createUserValidation(req.body);
    if (isValid.error)
      return res
        .status(400)
        .send(errorCreator(validation, isValid.error.details[0].message));
    var users = await user.findOne({ email: req.body.email });
    if (users)
      return res
        .status(400)
        .send(errorCreator(alreadyRegistered, "You've registered before"));
    else {
      users = await user.create(req.body);
      return res.json({
        msg: "You've registered successfully",
        data: users
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    if (password) {
      if (newPassword) {
      } else {
        return res
          .status(400)
          .send(errorCreator(validation, '"new password" is required'));
      }
    } else {
      return res
        .status(400)
        .send(errorCreator(validation, '"old password" is required'));
    }

    var users = await user.findById(req.body.userId);
    if (users) {
      if (req.body.password != users.password) {
        return res
          .status(400)
          .send(errorCreator(wrongPassword, "Wrong Password"));
      } else {
        let body = { password: newPassword };
        await user.findByIdAndUpdate({ _id: req.body.userId }, body);
        return res.json({
          msg: "Password updated successfully"
        });
      }
    } else {
      return res.status(400).send(errorCreator(usertNotFound, "No user found"));
    }
  } catch (exception) {
    console.log(exception);
    return res.status(400).send(errorCreator(unknown, "Unknown"));
  }
};
