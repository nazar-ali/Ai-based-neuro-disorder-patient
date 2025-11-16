import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // ✅ Check for existing user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // ✅ Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // ✅ Ensure environment variable exists
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT secret is missing in environment variables");
  }

  // ✅ Generate JWT (expires in 7 days)
  const accessToken = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role, // optional — if you have roles like caretaker/patient
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ Return safe user data
  return {
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
    },
    accessToken,
  };
};
