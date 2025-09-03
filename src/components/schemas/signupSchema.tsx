
import { z } from "zod";
export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;