const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        console.error("Error retrieving Order", err )
        res.status(500).json({ message: "Error retrieving Order", error: err.message });
    }
};
// GeT By Id
const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Order ID" });
        };
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error("Error retrieving Order by ID", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
// POST 
const createOrder = async (req, res) => {
    try {
        const {customerName, email, products, totalAmount, status} = req.body;
        if (!customerName || !email || !products ||!totalAmount) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error saving new Order", err);
        res.status(500).json({ message: "Error saving new Order", error: err.message });
    }
};
// ✅ PUT:
const updateOrder  = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid Order ID" })
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder)
    } catch (err) {
         console.error("Error updating Order:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
// ✅ DELETE:
const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({message: "Invalid Order ID"})
        }
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            res.status(400).json({message: "Order not found"})
        }
        res.status(200).json({message: "Order deleted"})
    } catch (err) {
        console.error("Error deleting Order:", err); 
        res.status(500).json({ message: "Error deleting Order", error: err.message });
    }
}
module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder};