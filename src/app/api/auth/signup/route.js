import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { passwordRegex } from '@/constants';
import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth/loginUser';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const profileImageUrl = formData.get('profileImageUrl');
    const role = formData.get('role'); // ✅ NEW: role added

    // ✅ Check all required fields
    if (!fullName || !email || !password || !profileImageUrl || !role) {
      return NextResponse.json(
        { success: false, data: null, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // ✅ Validate role (fixed typo)
    const validRoles = ['admin', 'doctor', 'patient', 'caretaker'];
    if (!validRoles.includes(role.toLowerCase())) {
      return NextResponse.json(
        { success: false, data: null, error: 'Invalid role specified' },
        { status: 400 }
      );
    }

    // ✅ Validate password
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // ✅ Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, data: null, error: 'Email already exists' },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user with role
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImageUrl,
      role: role.toLowerCase(),
    });

    // ✅ Auto login after signup
    let accessToken = null;
    if (typeof loginUser === 'function') {
      const loginResponse = await loginUser(email, password);
      accessToken = loginResponse?.accessToken;
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'User created and logged in successfully',
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
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
