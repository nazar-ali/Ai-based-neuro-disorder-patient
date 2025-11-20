import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    profileImageUrl: z
  .any()
  .refine(
    (files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    },
    { message: "Invalid file format." }
  ),

   role: z.enum(["admin","doctor", "patient"])
    .refine((val) => !!val, { message: "Role is required" }),
    
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
  
  

export type SignUpFormData = z.infer<typeof signUpSchema>;

