const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    phone: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    address: { type: String, required: true },
    userRegisterAt: { type: Date, default: Date.now() },
});
const User = mongoose.model("User", usersSchema);
module.exports = User;