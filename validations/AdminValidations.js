const { body } = require("express-validator");
const Admin = require("../models/Adminmodel");

const adminValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty"),

    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .custom(async (email) => {
        const admin = await Admin.findOne({ email });
        if (admin) {
          throw new Error("Admin email already exists");
        }
      }),

    // Validate phone
    body("phone")
      .notEmpty()
      .withMessage("Phone cannot be empty")
      .custom(async (phone) => {
        const admin = await Admin.findOne({ phone });
        if (admin) {
          throw new Error("Phone number already exists");
        }
      }),

    // Validate password
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty"),

    // Validate role (Optional: if you have roles like 'super-admin', 'admin')
    body("role")
      .notEmpty()
      .withMessage("Role cannot be empty"),

    // Validate other fields if required (like gender, address, etc.)
  ];
};

module.exports = adminValidation;
