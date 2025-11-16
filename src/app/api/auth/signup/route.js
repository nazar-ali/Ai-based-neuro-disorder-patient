import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { passwordRegex } from "@/constants";
import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth/loginUser";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const profileImageUrl = formData.get("profileImageUrl");
    const role = formData.get("role");

    // -----------------------------
    // 1️⃣ Validate Required Fields
    // -----------------------------
    if (!fullName || !email || !password || !profileImageUrl || !role) {
      return NextResponse.json(
        { success: false, error: "All fields are required", data: null },
        { status: 400 }
      );
    }

    // -----------------------------
    // 2️⃣ Allow Only Public Roles
    // -----------------------------
    const publicRoles = ["patient", "caretaker"];

    if (!publicRoles.includes(role.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "This role cannot be created publicly", data: null },
        { status: 403 }
      );
    }

    // -----------------------------
    // 3️⃣ Validate Password Strength
    // -----------------------------
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // 4️⃣ Connect DB
    // -----------------------------
    await dbConnect();

    // -----------------------------
    // 5️⃣ Check Duplicate Email
    // -----------------------------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered", data: null },
        { status: 409 }
      );
    }

    // -----------------------------
    // 6️⃣ Hash Password
    // -----------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------
    // 7️⃣ Create User
    // -----------------------------
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImageUrl,
      role: role.toLowerCase(),
    });

    // -----------------------------
    // 8️⃣ Auto Login After Signup
    // -----------------------------
    let accessToken = null;

    try {
      const loginResult = await loginUser(email, password);
      accessToken = loginResult?.accessToken;
    } catch (err) {
      console.error("⚠️ Auto-login failed:", err.message);
    }

    // -----------------------------
    // 9️⃣ Final Response
    // -----------------------------
    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Account created successfully",
          accessToken,
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
