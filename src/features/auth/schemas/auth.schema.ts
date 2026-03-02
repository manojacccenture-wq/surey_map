import { z } from "zod";

/* ================= SIGN IN ================= */

export const signInSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(10, "Username must be at most 10 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

/* ================= SIGN UP ================= */

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  identifier: z.string().min(5, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
  marketingConsent: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;