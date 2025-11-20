import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { passwordRegex } from "@/constants";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const profileImageUrl = formData.get("profileImageUrl");
    const role = formData.get("role")
    if (!fullName || !email || !password || !profileImageUrl) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // if (!passwordRegex.test(password.toString())) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error:
    //         "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    //     },
    //     { status: 400 }
    //   );
    // }

    await dbConnect();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
      status: "pending",
    });

    // ❌ NO TOKEN DURING SIGNUP — WAIT FOR ADMIN APPROVAL

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Signup successful. Waiting for admin approval.",
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: role,
            status: user.status,
            profileImageUrl: user.profileImageUrl,
          },
        },
      },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
