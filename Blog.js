import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String
});

export default mongoose.model("Blog", blogSchema);
