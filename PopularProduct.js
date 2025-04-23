import mongoose from "mongoose";

const PopularProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imageUrl: String, // ✅ Make sure this field exists
});

export default mongoose.model("PopularProduct", PopularProductSchema);
