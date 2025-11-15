import User from "@/models/User";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/lib/auth/auth.service";

export const createSuperAdminIfNotExists = async () => {
  const email = "admin@healthcare.com";

  const existingAdmin = await User.findOne({ email });

  if (!existingAdmin) {
    const hashedPassword = await hashPassword("Admin@12345");

    await User.create({
      fullName: "System Admin",
      email,
      password: hashedPassword,
      role: "admin",
      profileImageUrl: null,
    });

    console.log("✅ Admin user created automatically");
  } else {
    console.log("✔ Admin already exists");
  }
};
