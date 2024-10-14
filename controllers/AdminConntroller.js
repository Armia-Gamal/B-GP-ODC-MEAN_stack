const Admin = require("../models/Adminmodel"); // Import the Admin model
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const responseMsgs = require('./../utilities/responseMsgs');
const errorHandler = require('./../utilities/errorHandler');

const registerAdmin = async (req, res) => {
    try {
        const { email, password, name, phone, gender } = req.body;

        // Check for existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10); 

        const newAdmin = new Admin({
            email,
            password: hashPassword,
            name,
            phone,
            gender,
            adminRegisterAt: new Date(),
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, name: admin.name }, "your_jwt_secret", { expiresIn: '1h' });

        res.cookie('jwt', token, { httpOnly: true }).json({
            status: responseMsgs.SUCCESS,
            data: 'Logged in successfully as admin'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single admin by ID
const getSingleAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update admin details
const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
