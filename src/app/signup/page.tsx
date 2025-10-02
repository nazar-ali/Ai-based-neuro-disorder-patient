"use client";

import { Controller, useForm } from "react-hook-form"; // ✅ only useForm here
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useUploadImage } from "@/hooks/useUploadImage";
import { useLoggedInUser } from "@/hooks/userLoggedIn";
import { saveAccessToken } from "@/lib/helpers";
import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from 'next/navigation';
import { RegisterUserPayload } from "@/types/user";
import Loader from "@/components/common/Loader";
import { MAX_FILE_SIZE } from "@/constants";

type SignUpFormDataType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  profileImageUrl: FileList; 
};


export default function SignUpPage() {
  // debugger
    const router = useRouter();
  const { setLoggedInUser } = useLoggedInUser();
 const {
    loading,
    errorMessage,
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
    terms: false,
    profileImageUrl: undefined, // add if schema expects it
  },
});

 
  const password = form.watch('password');

 const watchedFile = form.watch("profileImageUrl")?.[0] ?? null;

  const removeSelectedFile = () => {
    form.resetField('profileImageUrl');
  };

  const { onUploadImage, uploadingFile, fileUploadError } = useUploadImage({
    watchedFile,
  });


const onSubmit = async (data: SignUpFormData) => {
  const { fullName, email, password } = data;
  
    try {
      const profileImageUrl = await onUploadImage();
      if (profileImageUrl) {
        const userPayload: RegisterUserPayload = {
          fullName,
          email,
          password,
          profileImageUrl,
        };
        const response = await registerUser(userPayload);
        setLoggedInUser(response?.user);
        saveAccessToken(response?.accessToken);

        form.reset();

        router.replace(APP_ROUTES.DASHBOARD);
      }
    } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};



  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8faff]">
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
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
              <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Full Name */}
              <FormField
  control={form.control}
  name="fullName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Full Name</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter your full name"
          value={field.value} // controlled by RHF
          onChange={(e) => field.onChange(e.target.value)} // ✅ manual e.target.value
        />
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
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)} // ✅ use e.target.value
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
        <Input
          type="password"
          placeholder="••••••••"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)} // ✅ use e.target.value
        />
      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>


                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />

              <Controller
  name="profileImageUrl"
  control={form.control}
  rules={{ required: "Profile picture is required" }}
  render={({ field }) => (
    <ImageUploadInput
      label="Profile Picture"
      classes="mt-3"
      watchedFile={watchedFile}
      removeSelectedFile={removeSelectedFile}
      // register removed, field already gives value + onChange
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
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />
  {loading || uploadingFile ? (
          <div className='mt-8'>
            <Loader variant='secondary' />
          </div>
        ) : (
                <Button type="submit"  className="w-full bg-[var(--primary-color)] hover:bg-blue-600 transition-colors">
                  Sign Up
                </Button>
        )}
              </form>
            </Form>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium underline text-[var(--primary-color)] hover:text-blue-500 transition-colors">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


