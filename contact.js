import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// POST: Save contact form
router.post("/", async (req, res) => {
  try {
    const { name, contact, email, message } = req.body;
    const newContact = new Contact({ name, contact, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// DELETE contact by ID
router.delete("/:id", async (req, res) => {
    try {
      const contactId = req.params.id;
      await Contact.findByIdAndDelete(contactId);
      res.json({ message: "Contact deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });
  

// GET: Fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
