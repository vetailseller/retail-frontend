/**
 * Zod Validation Schemas
 * Type-safe validation schemas for form validation
 */

import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Record Schema
export const recordSchema = z.object({
  phoneNo: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .min(7, "ဖုန်းနံပါတ် သည် ၇ လုံးမှ ၁၁ လုံးကြားရှိရမည်")
    .max(11, "ဖုန်းနံပါတ် သည် ၇ လုံးမှ ၁၁ လုံးကြားရှိရမည်"),
  date: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),
  amount: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .refine(
      (val) => !isNaN(Number(val.replace(/,/g, ""))),
      "ဂဏန်းသီးသန့်ဖြစ်ရမည်"
    )
    .refine((val) => Number(val.replace(/,/g, "")) > 0, "အချက်အလက်ဖြည့်ရန် *"),
  fee: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .refine(
      (val) => !isNaN(Number(val.replace(/,/g, ""))),
      "ဂဏန်းသီးသန့်ဖြစ်ရမည်"
    )
    .refine((val) => Number(val.replace(/,/g, "")) > 0, "အချက်အလက်ဖြည့်ရန် *"),
});

export type RecordFormData = z.infer<typeof recordSchema>;

// Fee Schema
export const feeSchema = z.object({
  name: z
    .string()
    .min(1, "Fee name is required")
    .min(2, "Fee name must be at least 2 characters")
    .max(100, "Fee name must be at most 100 characters"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters")
    .optional(),
  type: z
    .enum(["service", "late", "processing", "other"])
    .refine((val) => val !== undefined, {
      message: "Fee type is required",
    }),
  dueDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),
  recordId: z.string().optional(),
});

export type FeeFormData = z.infer<typeof feeSchema>;

// Export all schemas
export const schemas = {
  login: loginSchema,
  register: registerSchema,
  record: recordSchema,
  fee: feeSchema,
};
