// routes/popularProducts.js

import express from "express";
import multer from "multer";
import path from "path";

import PopularProduct from "../models/PopularProduct.js";

const router = express.Router();

// ✅ Multer config for file upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});
const upload = multer({ storage });

// ✅ POST: Add a product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imageUrl = "/uploads/" + req.file.filename;

    const newProduct = new PopularProduct({ title, price, imageUrl });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET: Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await PopularProduct.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE: Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PopularProduct.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
