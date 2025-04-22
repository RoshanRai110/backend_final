import mongoose from "mongoose";
import Admin from "./models/Admin.js";

mongoose
  .connect("mongodb+srv://sanviosystems110:Sanviosystems@cluster0.6y3htdv.mongodb.net/sanvioDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(async () => {
    const exist = await Admin.findOne({ email: "admin@example.com" });

    if (exist) {
      console.log("❗Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      email: "admin@example.com",
      password: "admin123", // ye password schema ke pre-save hook se hash ho jayega
    });

    await admin.save();
    console.log("✅ Admin created successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit();
  });
