import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { createSuperAdminIfNotExists } from "@/lib/auth/starter";
import { comparePassword } from "@/lib/auth/auth.service";

export async function POST(req) {
  try {
    await dbConnect();
    await createSuperAdminIfNotExists();

    const { email, password, role } = await req.json();
console.log("Login attempt:", { email, role,password });
    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // Find user
    console.log("find user for the email:", email);
    const user = await User.findOne({ email }).select("+password");

    console.log("User Details:", user);

    if (!user) {
      console.log("No user found with email:", email);
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare raw password with stored hashed password
    const isMatch = await comparePassword(password,  user.password);
console.log("show both passowrds for comparssions",password,user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Role check
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Invalid role for this account" },
        { status: 403 }
      );
    }

    // Generate JWT
    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Safe user data
    const userData = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl || null,
    };

    // Send response
    const response = NextResponse.json({
      success: true,
      data: {
        message: "Login successful",
        user: userData,
        accessToken: token,
      },
    });

    // Set auth cookie
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
