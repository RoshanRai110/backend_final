import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brand: String,
  price: Number,
  img: String,
});

export default mongoose.model("Product", productSchema);
