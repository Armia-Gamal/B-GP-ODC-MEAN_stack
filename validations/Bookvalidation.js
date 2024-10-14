const { body } = require("express-validator");

const bookValidation = () => {
    return [
        body("date").isISO8601().withMessage("Date must be a valid date in ISO 8601 format"),

        body("time").isString().withMessage("Time should be a string").notEmpty().withMessage("Time cannot be empty"),

        body("name").isString().withMessage("Name should be a string").notEmpty().withMessage("Name cannot be empty"),

        body("phone").isString().withMessage("Phone should be a string").notEmpty().withMessage("Phone cannot be empty"),

        body("totalPerson").isNumeric().withMessage("TotalPerson should be a number").isInt({ gt: 0 }).withMessage("TotalPerson should be greater than 0"),
    ];
};

module.exports = bookValidation;
