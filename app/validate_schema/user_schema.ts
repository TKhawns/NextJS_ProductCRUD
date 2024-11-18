import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SingupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    city: z
      .string()
      .min(1)
      .refine((data) => data !== "City", {
        message: "Please select a city first",
      }),
    district: z
      .string()
      .min(1)
      .refine((data) => data !== "Select District", {
        message: "Please select a district first",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SingupSchemaType = z.infer<typeof SingupSchema>;
