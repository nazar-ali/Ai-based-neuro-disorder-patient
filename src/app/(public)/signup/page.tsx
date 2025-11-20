"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SignUpFormData,
  signUpSchema,
} from "@/components/schemas/signupSchema";

import { toast } from "sonner";
import ImageUploadInput from "@/components/ImageUploadInput";
import { registerUserAPI } from "@/lib/api";
import { useNetworkRequest } from "@/hooks/useNetworkRequest";
import { useLoggedInUser } from "@/hooks/userLoggedIn";
import { saveAccessToken } from "@/lib/helpers";
import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { upload } from "@vercel/blob/client"; 
import { useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { setLoggedInUser } = useLoggedInUser();
  const {
    loading,
    executeFunction: registerUser,
  } = useNetworkRequest({
    apiFunction: registerUserAPI,
  });

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      terms: false,
      profileImageUrl: undefined,
    },
  });


  const watchedFile = form.watch("profileImageUrl")?.[0] ?? null;

  const removeSelectedFile = () => {
    form.resetField("profileImageUrl");
  };

const onSubmit = async (data: SignUpFormData) => {
  try {
    if (!watchedFile) {
      toast.error("Please upload a profile picture");
      return;
    }

    // 1. Upload image to Vercel Blob
    const blob = await upload(
      `users/${data.email}/${watchedFile.name}`,
      watchedFile,
      {
        access: "public",
        handleUploadUrl: "/api/upload-file",
      }
    );

    const uploadedUrl = blob.url;

    // 2. Prepare FormData payload
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("password", data.password);
    formData.append("profileImageUrl", uploadedUrl);

    // 3. API call
    const result = await registerUserAPI(formData);

    // 4. Handle API failure
    if (!result || !result.success) {
     toast.error( "Signup failed. Please try again.");
    }

    // 5. Save user + token
if(result.success){
  toast.success(result?.message);

  form.reset();
  removeSelectedFile();
}

    // 6. Reset form

    // router.push("/dashboard");

  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};


  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8faff]">
      <main className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-gray-900">
              Welcome to <span className="text-blue-600">NeuroCare</span>
            </CardTitle>
            <p className="mt-1 text-center text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
               <FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="block font-bold">Select your role</FormLabel>
      <div className="grid grid-cols-2 gap-2 mt-2">

        {/* Only public roles */}
        {["doctor","patient"].map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => field.onChange(role)}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
              field.value === role
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {role === "doctor" && <span className="text-xl">👨‍👩‍👧‍👦</span>}
            {role === "patient" && <span className="text-xl">🙍‍♂️</span>}
            <span className="capitalize">{role}</span>
          </button>
        ))}
      </div>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              

              
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Profile Image */}
                <Controller
                  name="profileImageUrl"
                  control={form.control}
                  rules={{ required: "Profile picture is required" }}
                  render={({ field }) => (
                    <ImageUploadInput
                      label="Profile Picture"
                      classes="mt-3"

                      removeSelectedFile={removeSelectedFile}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  )}
                />

                {/* Terms */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          I agree to the{" "}
                          <Link href="#" className="underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="underline">
                            Privacy Policy
                          </Link>
                        </FormLabel>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                {loading ? (
                  <div className="mt-6">
                    <Loader variant="secondary" />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[var(--primary-color)] hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </Button>
                )}
              </form>
            </Form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium underline text-[var(--primary-color)] hover:text-blue-500 transition-colors"
              >
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


