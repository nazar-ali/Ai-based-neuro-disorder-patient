"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

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
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

const onSubmit = (data: LoginForm) => {
    try {
      // Get stored signup data from localStorage
      const storedData = localStorage.getItem("signupData");

      if (!storedData) {
        toast.error("No account found. Please sign up first.");
        return;
      }

      const parsedData = JSON.parse(storedData);

      // Compare entered credentials with stored data
      if (
        parsedData.email === data.email &&
        parsedData.password === data.password
      ) {
        toast.success("Login successful 🎉");
        console.log("Logged in user:", parsedData);

        router.push("/dashboard");
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8faff]">
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">NeuroCare</h1>
          </Link>

          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
          >
            Sign Up
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Welcome NeuroCare Assistent  
            </CardTitle>
            <p className="mt-1 text-center text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
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
                          className="focus:ring-2 focus:ring-gray-500 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password with show/hide */}
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
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password */}
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
                  className="w-full bg-[var(--primary-color)] hover:bg-blue-600 transition-colors"
                >
                  Sign In
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
      </main>
    </div>
  );
}
