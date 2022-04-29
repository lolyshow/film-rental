const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
 createdBy: {     
   type: mongoose.Schema.Types.ObjectId, ref:"users",    
   required: true,
   },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("products", ProductSchema);

module.exports = Product;