const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookContoller");
const BookValidation = require("../validations/Bookvalidation");

router.route("/")
    .get(BookController.getAllBook)
    .post(BookValidation(),BookController.addBook)

router.route("/:id")
    .get(BookController.getsingleBook)
    .patch(BookValidation(),BookController.updateBook)
    .delete(BookController.deleteBook)

module.exports = router