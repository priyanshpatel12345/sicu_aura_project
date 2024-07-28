import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be atleast 3 character" })
    .max(255, { message: "Email must not be more than 255 character" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 character" })
    .max(1024, { message: "Password must not be more than 1024 character" })
    .regex(/(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message:
        "Password must contain at least one special character and one number",
    }),
});

export const signupSchema = loginSchema.extend({
  hospitalName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 character" }),

  phoneNumber: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 Number" })
    .max(13, { message: "Phone must not be more than 13 character" }),
});
