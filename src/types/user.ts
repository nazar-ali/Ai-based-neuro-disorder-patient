// types/auth.ts
export type RegisterUserPayload = {
  profile_name: string;          // ✅ User's full name
  profile_email: string;         // ✅ User's email address
  password: string;              // ✅ User's password (plain, hashed later)
  role: "doctor" | "caretaker" | "patient" | "admin";  // ✅ Limited to valid roles
  profile_image?: string;        // ✅ Optional profile image URL
};
