const { body } = require("express-validator");

const contactValidation = () => {
    return [
        body("Name").isString().withMessage("Name should be a string").notEmpty().withMessage("Name is required"),

        body("Email").isEmail().withMessage("Please provide a valid email address").notEmpty().withMessage("Email is required"),

        body("Subject").isString().withMessage("Subject should be a string").isLength({ min: 5, max: 100 }).withMessage("Subject must be between 5 and 100 characters long").notEmpty().withMessage("Subject is required"),
       
        body("Message").isString().withMessage("Message should be a string").isLength({ min: 10, max: 500 }).withMessage("Message must be between 10 and 500 characters long").notEmpty().withMessage("Message is required"),
    ];
};

module.exports = contactValidation;
