    const {body} = require("express-validator");

    const categoriesValidation = () => {
        return [
            body("strCategory").isString().withMessage("strCategory should be a string").notEmpty().withMessage("strCategory cannot be empty"),

            body("strCategoryThumb").isString().withMessage("strCategoryThumb should be a string").notEmpty().withMessage("strCategoryThumb cannot be empty"),

            body("strCategoryDescription").optional() .isString().withMessage("strCategoryDescription should be a string"),

            body("price").isNumeric().withMessage("price should be a number").isFloat({ gt: 0 }).withMessage("price should be greater than 0"),

            body("rate").isNumeric().withMessage("rate should be a number").isFloat({ min: 0, max: 5 }).withMessage("rate should be between 0 and 5"),
        ];
    };

    module.exports = categoriesValidation;
