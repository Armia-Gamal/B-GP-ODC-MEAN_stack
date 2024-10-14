const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactContoller");
const contactValidation = require("../validations/contactvalidation");
router.route("/")
    .get(contactController.getAllcontact)
    .post(contactValidation(),contactController.addcontact)

router.route("/:id")
    .get(contactController.getsinglecontact)
    .patch(contactValidation(),contactController.updatecontact)
    .delete(contactController.deletecontact)

module.exports = router