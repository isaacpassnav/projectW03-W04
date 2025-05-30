const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"]
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Price must be >= 0"]
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, "Total Amount is required"],
    min: [0, "Total amount must be >=0"]
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "shipped", "cancelled"]
  }
}, { timestamps: true });


module.exports = mongoose.model("Orders", orderSchema);