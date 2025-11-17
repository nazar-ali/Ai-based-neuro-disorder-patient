import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { fullName, email, password, role } = body;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "fullName, email, password, and role are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with provided role (doctor, caretaker, patient, etc.)
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
      // profileImageUrl can be optional for API-created users
      profileImageUrl: "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    // Query params: ?role=doctor&role=caretaker (optional filtering)
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    let query = {};
    if (role) {
      query.role = role.toLowerCase();
    }

    const users = await User.find(query).select("-password");

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
