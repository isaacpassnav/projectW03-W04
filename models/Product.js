const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    lowercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be >= 0"]
  },
  stock: {
    type: Number,
    default: 0,
    required: [true, "Product stock is required"],
    min: [0, "Stock must be >= 0"]
  },
  category: {
    type: String,
    required: [true, "Category is required"] 
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
