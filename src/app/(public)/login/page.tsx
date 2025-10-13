"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function LoginPage() {
  const router = useRouter();
 const { setLoggedInUser } = useLoggedInUser();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);

      const result = await loginUserAPI(data);
       setLoggedInUser(result?.data?.user);
      console.log("Login API Result:", result);

      if (!result?.success || !result?.data) {
        toast.error(result?.error || "Invalid credentials");
        return;
      }

      const { user, accessToken, message } = result.data;

      toast.success(message || "Login successful 🎉 Redirecting...");

      localStorage.setItem("user", JSON.stringify(user));
      saveAccessToken(accessToken);

      setTimeout(() => {
        router.replace(APP_ROUTES.DASHBOARD);
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
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Welcome to NeuroCare Assistant
          </CardTitle>
          <p className="mt-1 text-center text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="focus:ring-2 focus:ring-gray-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500"/>
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="focus:ring-2 focus:ring-gray-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500"/>
                  </FormItem>
                )}
              />

            
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
