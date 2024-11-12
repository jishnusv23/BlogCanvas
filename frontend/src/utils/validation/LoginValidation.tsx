import { z } from "zod";
const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const LoginformSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Email max is 30 characters" }),
  password: z.string().refine((value) => strongPassword.test(value), {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});
