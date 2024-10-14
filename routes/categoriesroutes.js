    const express = require("express");
    const router = express.Router();
    const categoriesController = require("../controllers/categoriesContoller");
    const categoriesValidation = require("../validations/categoriesvalidation");
    const authMiddleware = require("../middleware/usersMiddleware");
    const upload = require("../utilities/categoriesImageUpload");
    router.route("/")
        .get(categoriesController.getAllcategories)
        .post(
            upload.single("strCategoryThumb")
            ,categoriesValidation(),categoriesController.addcategories)

    router.get('/agg', categoriesController.aggregatecategories)
    router.route("/:id")
    .get(categoriesController.getsinglecategorierie)
    .put(
        upload.single("strCategoryThumb"), 
        categoriesValidation(), 
        categoriesController.updatecategories
    )
    .delete(categoriesController.deletecategories)


    module.exports = router