import { z } from "zod";

export const registerUserSchema = z.object({

  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone must be 10 digits"),

  username: z
    .string()
    .min(4, "Username must be 4 characters"),

  usercode: z
    .string()
    .min(3, "User code required"),

  password: z
    .string()
    .min(6, "Password must be 6 characters"),

  confirmPassword: z
    .string()

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type RegisterUserForm = z.infer<typeof registerUserSchema>;