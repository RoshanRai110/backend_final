import express from "express";
import multer from "multer";
import Blog from "../models/Blog.js";
import path from "path";

const router = express.Router();

// Storage location for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// Get all blogs
router.get("/", async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });
  

/* ============================
      POST: Create New Blog
============================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file.filename;

    const newBlog = new Blog({ title, description, image });
    await newBlog.save();

    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Failed to post blog" });
  }
});

/* ============================
      DELETE: Blog by ID
============================= */
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

/* ============================
      PUT: Update Blog by ID
============================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create update object
    const updateData = {
      title,
      description,
    };

    // Check if new image is uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

export default router;
