import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { comparePassword } from "@/lib/auth/auth.service";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await dbConnect();

    
    const body = await req.json();
    console.log("Incoming body:", body);

    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // FIND USER
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log("User not found in DB:", email);
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

   
    const isMatch = await comparePassword(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ROLE CHECK
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Invalid role for this account" },
        { status: 403 }
      );
    }

    // JWT
    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          profileImageUrl: user.profileImageUrl || null,
        },
        accessToken: token,
      },
    });

    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
