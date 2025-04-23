import mongoose from "mongoose";

const sliderImageSchema = new mongoose.Schema({
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SliderImage", sliderImageSchema);
