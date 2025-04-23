// routes/sliderRoutes.js
import express from "express";
import multer from "multer";
import SliderImage from "../models/SliderImage.js";
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const allImages = await SliderImage.find().sort({ createdAt: 1 });

    if (allImages.length >= 5) {
      const oldest = allImages[0];
      fs.unlinkSync(`uploads/${oldest.imageUrl.split("/uploads/")[1]}`);
      await SliderImage.findByIdAndDelete(oldest._id);
    }

    const newImage = new SliderImage({ imageUrl: `/uploads/${req.file.filename}` });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const images = await SliderImage.find().sort({ createdAt: -1 });
  res.json(images);
});

router.delete("/:id", async (req, res) => {
  const image = await SliderImage.findById(req.params.id);
  if (!image) return res.status(404).json({ error: "Image not found" });

  fs.unlinkSync(`uploads/${image.imageUrl.split("/uploads/")[1]}`);
  await image.deleteOne();
  res.json({ message: "Deleted successfully" });
});

export default router;
