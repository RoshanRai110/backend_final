// ✅ Use only import — NO require
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Import routes with `.js` extension
import popularProductsRoutes from "./routes/popularProducts.js";
import contactRoutes from "./routes/contact.js";
import productRoutes from "./routes/products.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js"; // ✅ FIXED this line

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Route usage
app.use("/api/popular-products", popularProductsRoutes);  
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", authRoutes);
app.use("/api/slider", sliderRoutes);

mongoose.connect("mongodb+srv://sanviosystems110:Sanviosystems@cluster0.6y3htdv.mongodb.net/sanvioDB?retryWrites=true&w=majority&appName=Cluster0")

// mongoose.connect("mongodb+srv://sanviosystems110:Sanviosystems@cluster0.6y3htdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
