const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    gender: String,
    adminRegisterAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
