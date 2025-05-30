const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Error retrieving product", err )
        res.status(500).json({ message: "Error retrieving product", error: err.message });
    }
}
// GET by id:
const getProductById = async (req, res) => {
    try {
        const producId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(producId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(producId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(product)
    } catch (err) {
        console.error("Error retrieving Product by ID", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
const createProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category} =req.body;
        if (!name || !price || !stock) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newproduct = new Product(req.body);
        const savedProduct = await newproduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error saving new product", err);
        res.status(500).json({ message: "Error saving new product", error: err.message });
    };
}
// ✅ PUT:
const updateProduct = async (req, res) => {
    try {
        const producId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(producId)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct)
    } catch (err) {
        console.error("Error updating Product:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
//Delete:
const deleteProduct =async (req, res) => {
    try {
        const producId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(producId)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        };
        const deletedProduct = await Product.findByIdAndDelete(producId);
        if (!deletedProduct) {
            return res.status(404).json({message: "Product not found"})
        };
        res.status(200).json({message: "Product deleted"});
    } catch (err) {
        console.error("Error deleting contProductact:", err); 
        res.status(500).json({ message: "Error deleting Product", error: err.message });
    }
}
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};