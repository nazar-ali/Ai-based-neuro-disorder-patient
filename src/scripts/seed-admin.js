import mongoose from "mongoose";
import User from "../models/User.js";
import { hashPassword } from "../lib/auth/auth.service.js";
import dbConnect from "../lib/mongoose.js";


async function run() {
  try {
    await dbConnect();

    const email = "admin@healthcare.com";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("✔ Admin already exists. No new admin created.");
      process.exit(0);
    }

    const hashedPassword = await hashPassword("Nazar@123");

    await User.create({
      fullName: "Super Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("🎉 Super Admin created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

run();
