const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    strCategory: { type: String, required: true },
    strCategoryThumb: { type: String, required: true },
    strCategoryDescription: { type: String },
    price: { type: Number, required: true },
    rate: { type: Number, min: 0, max: 5 } 
});

const Categorymodel = mongoose.model("Category", categoriesSchema);

module.exports = Categorymodel
        
