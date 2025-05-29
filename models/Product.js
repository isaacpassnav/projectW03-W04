const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  stock: { type: String, default: 0, required: true },
  category: { type: String }
}, { timestamps: true }); 

module.exports = mongoose.model("Product", productSchema);
