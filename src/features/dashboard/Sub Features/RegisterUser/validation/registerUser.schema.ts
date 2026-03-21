import { z } from "zod";
import { noHtml } from "@/utils/zod/zodReuser";

export const registerUserSchema = z.object({

  name: noHtml("Name", 2),


  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  username: noHtml("Username", 4),


  usercode: noHtml("User code", 3),

/*   password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),

  confirmPassword: z
    .string() */

})/* .refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
}); */

export type RegisterUserForm = z.infer<typeof registerUserSchema>;