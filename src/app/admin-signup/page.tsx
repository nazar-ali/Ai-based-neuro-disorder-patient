"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AdminSignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState<"doctor" | "admin">("doctor");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setProfileImg(file);

    if (file) {
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  };

  const handleAdminCreate = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setErrorMsg("You are not authorized.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      if (profileImg) {
        formData.append("profileImageUrl", profileImg);
      }

      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data: {
        success: boolean;
        error?: string;
      } = await res.json();

      if (!data.success) {
        setErrorMsg(data.error || "Failed to create user.");
      } else {
        router.push("/admin-users");
      }
    } catch (err) {
      setErrorMsg("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-lg shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create New Admin / Doctor
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Only Super Admins can add system users
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAdminCreate} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Role Select */}
            <div>
              <Label>User Role</Label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "doctor" | "admin")
                }
                className="w-full mt-1 border rounded-md p-2 bg-white"
              >
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Image upload */}
            <div>
              <Label>Profile Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 rounded-full mt-2 object-cover border"
                />
              )}
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-red-600 text-sm text-center">{errorMsg}</p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
