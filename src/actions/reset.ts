"use server";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import * as z from "zod";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Email!" };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found!" };

  // Generate Token and Sent Email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset Email Sent" };
};
