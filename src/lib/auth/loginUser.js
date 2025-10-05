import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    },
    accessToken,
  };
};
