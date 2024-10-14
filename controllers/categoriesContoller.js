    const Category = require("../models/categorirsmodel");

    const addcategories = async (req, res) => {
        try {
            let filename = req.file;

            if (!filename) {
                return res.status(400).json({ message: "File upload is required for strCategoryThumb" });
            }

            const filePath = filename.path.replace(/\\/g, "/");

            const newCategory = new Category({
                ...req.body, 
                strCategoryThumb: filePath 
            });

            const savedCategory = await newCategory.save();

            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    const getAllcategories = async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    const getsinglecategorierie = async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    const deletecategories = async (req, res) => {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);
            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    const updatecategories = async (req, res) => {
        try {
            let updatedData = { ...req.body };
    
            if (req.file) {
                const filePath = req.file.path.replace(/\\/g, "/"); // Ensure file is correctly processed
                updatedData.strCategoryThumb = filePath;
            }
    
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
    
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    



    const aggregatecategories = async (req, res) => {

        let page = req.query . page || 1
    let limit = 10
    let skip = (page - 1) * limit

        let aggregate = await Category.find({}).limit(limit).skip(skip)

        res. json(aggregate)};

    module.exports = {
        addcategories,
        getAllcategories,
        getsinglecategorierie,
        deletecategories,
        updatecategories,
        aggregatecategories
    }