const { body } = require("express-validator");
const User = require("../models/usersmodel");

const usersValidation = () => {
  return [
    body("name").notEmpty().withMessage("Name cannot be empty"),
    body("email")
      .isEmail().withMessage("Please provide a valid email address")
      .notEmpty().withMessage("Email cannot be empty")
      .custom(async (data) => {
        const user = await User.findOne({ email: data });
        if (user) {
          throw new Error("Email already exists");
        }
      }),
    body("phone")
      .notEmpty().withMessage("Phone cannot be empty")
      .custom(async (data) => {
        const user = await User.findOne({ phone: data }); // Fix here
        if (user) {
          throw new Error("Phone already exists");
        }
      }),
    body("password").notEmpty().withMessage("Password cannot be empty"),
    body("gender").notEmpty().withMessage("Gender cannot be empty"),
    body("address").notEmpty().withMessage("Address cannot be empty"),
  ];
};

module.exports = usersValidation;
