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

const createProduct = async (req, res) => {
    try {
        const newproduct = new Product(req.body);
        const savedProduct = await newproduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error saving new product", err);
        res.status(500).json({ message: "Error saving new product", error: err.message });
    };
}

module.exports = { getAllProducts, createProduct};