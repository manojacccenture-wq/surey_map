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
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  username: z
    .string()
    .min(4, "Username must be 4 characters"),

  usercode: z
    .string()
    .min(3, "User code required"),

password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number"),

  confirmPassword: z
    .string()

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type RegisterUserForm = z.infer<typeof registerUserSchema>;