const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    time: { type: String, required: true },
    name: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    totalPerson: { type: Number, required: true } 
});

const Bookmodel = mongoose.model("Book", bookSchema);

module.exports = Bookmodel
