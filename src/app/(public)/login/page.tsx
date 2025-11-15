"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel, 
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { LoginForm, loginSchema } from "@/components/schemas/loginSchema";
import { loginUserAPI } from "@/lib/api";
import { saveAccessToken } from "@/lib/helpers";
import { APP_ROUTES } from "@/constants/app-routes";
import { useLoggedInUser } from "@/hooks/userLoggedIn";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {
  const router = useRouter();
 const { setLoggedInUser } = useLoggedInUser();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: ""  },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams=useSearchParams();
  const redirectURL=searchParams?.get('redirectURL') || APP_ROUTES.DASHBOARD

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);

      const result = await loginUserAPI(data);
       setLoggedInUser(result?.data?.user);
      console.log("Login API Result:", result?.data?.user?.role);

      if (!result?.success || !result?.data) {
        toast.error(result?.error || "In valid credentials");
        return;
      }

      const { user, accessToken, message } = result.data;

      toast.success(message || "Login successful 🎉 Redirecting...");

      localStorage.setItem("user", JSON.stringify(user));
      saveAccessToken(accessToken);

      setTimeout(() => {

        router.replace(redirectURL);
      }, 800);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faff] justify-center items-center p-6">
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
            <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
    
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
        {["admin", "doctor", "caretaker", "patient"].map((role) => (
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
            {role === "admin" &&  <span className="text-xl ">🧑‍💼</span>}
            {role === "doctor" && <span className="text-xl ">🩺</span>}
            {role === "caretaker" && <span className="text-xl ">👨‍👩‍👧‍👦</span>}
            {role === "patient" && <span className="text-xl ">🙍‍♂️</span>}
            <span className="capitalize">{role}</span>
          </button>
        ))}
      </div>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>

             {/* Email */}
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="example@email.com"
            {...field}
            className="pl-10 focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>

{/* Password */}
<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            {...field}
            className="pl-10 pr-10 focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>


          {/* <FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-white">
          <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="doctor">Doctor</SelectItem>
          <SelectItem value="caretaker">Caretaker</SelectItem>
          <SelectItem value="patient">Patient</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/> */}

              <div className="flex items-center justify-between text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-[var(--primary-color)] hover:text-blue-500 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] hover:bg-blue-600 transition-colors"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[var(--primary-color)] hover:text-blue-600"
                >
                  Create one
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
