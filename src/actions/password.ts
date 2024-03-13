"use server";

import { getPasswordResetTokenByToken } from "@/data/reset-password";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { PasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";

export const newPassword = async (
  values: z.infer<typeof PasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing Token!" };

  const validatedFields = PasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields!" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Invalid Token" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: "Password Updated" };
};
