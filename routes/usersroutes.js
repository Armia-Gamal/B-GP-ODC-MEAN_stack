const express = require("express");
const router = express.Router()
const Usercontroller = require("../controllers/usersConntroller");
const usersValidation = require("../validations/usersValidations");


router.post("/register",usersValidation(),Usercontroller.registerUser)
router.post("/login",Usercontroller.loginUser)


module.exports = router 



