import z from "zod";


export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."),
});

export type LoginForm = z.infer<typeof loginSchema>;