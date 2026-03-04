import { z } from 'zod';

export const createUserSchema = z.object({
  role: z
    .string()
    .min(1, "Role is required")
    .refine(
      (val) => ["superadmin", "admin", "user"].includes(val),
      {
        message: "Invalid role selected",
      }
    ),


  vendor: z.string().min(1, 'Vendor is required'),
  userId: z.string().min(3, 'User ID must be at least 3 characters'),
  userName: z.string().min(2, 'User name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  aadharCardNumber: z.string().regex(/^\d{12}$/, 'Aadhar card number must be exactly 12 digits'),
  pancardNumber: z.string().min(10, 'PAN card number must be 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
});

export const editUserSchema = z.object({
  userId: z.string().min(3, 'User ID must be at least 3 characters'),
  userName: z.string().min(2, 'User name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  aadharCardNumber: z.string().regex(/^\d{12}$/, 'Aadhar card number must be exactly 12 digits'),
  pancardNumber: z.string().min(10, 'PAN card number must be 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
});
