// models/Admin.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Admin schema
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash password before saving
  }
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
