import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(10, "Username must be at most 10 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

// Strongly typed form data
export type SignInSchemaType = z.infer<typeof signInSchema>;