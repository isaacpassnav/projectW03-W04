const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("products.productId");
        res.status(200).json(orders);
    } catch (err) {
        console.error("Error retrieving Order", err )
        res.status(500).json({ message: "Error retrieving Order", error: err.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error saving new Order", err);
        res.status(500).json({ message: "Error saving new Order", error: err.message });
    }
};
module.exports = { getAllOrders, createOrder};