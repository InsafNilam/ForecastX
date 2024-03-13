import { UserRole } from "@prisma/client";
import * as z from "zod";

export const DashboardSchema = z.object({
  city: z.optional(z.string()),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "New Password is Required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    { message: "Password is Required", path: ["password"] }
  );

export const PasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 Characters Required" }),
});

export const ResetSchema = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
});

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
  password: z.string().min(1, { message: "Password is Required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    firstname: z.string().min(1, { message: "First Name is Required" }),
    lastname: z.string().min(1, { message: "Last Name is Required" }),
    username: z.string().min(1, { message: "User Name is Required" }),
    email: z.string().min(1, { message: "Email is Required" }).email(),
    password: z.string().min(8, { message: "Must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must be at least 8 characters" }),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirmPassword) return false;
      return true;
    },
    { message: "Password don't match", path: ["confirmPassword"] }
  );
