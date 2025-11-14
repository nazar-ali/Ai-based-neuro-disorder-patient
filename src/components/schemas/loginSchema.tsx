import z from "zod";


export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."),
  role: z
    .enum(["admin","doctor", "caretaker", "patient"])
    .refine((val) => !!val, { message: "Role is required" }),
  });

export type LoginForm = z.infer<typeof loginSchema>; 