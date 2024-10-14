const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminConntroller");
const adminValidation = require("../validations/AdminValidations");

router.post("/register", adminValidation(), AdminController.registerAdmin);

router.post("/login", AdminController.loginAdmin);

module.exports = router;
    