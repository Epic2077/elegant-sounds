import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]{6,}$/, {
        message:
          "Password must be at least 6 characters, contain uppercase, number, special character (!@#$)",
      }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),

    firstName: z.string().regex(/^[a-zA-Z]+$/, {
      message: "Only letters are allowed",
    }),
    lastName: z
      .string()
      .regex(/^[a-zA-Z]+$/, { message: "Only letters are allowed" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default signupSchema;
