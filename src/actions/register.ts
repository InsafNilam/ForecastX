"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields!" };

  const { email, password, firstname, lastname, username } =
    validatedFields.data;

  const userEmailExists = await getUserByEmail(email);

  // Check if email already exists
  if (userEmailExists) {
    return { user: null, error: "User with this email already exists" };
  }

  // Check if username already exists
  const userNameExists = await db.user.findUnique({
    where: { username: username },
  });
  if (userNameExists) {
    return { user: null, error: "User with this username already exists" };
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await db.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  const { password: newPassword, ...rest } = newUser;

  // TODO: Send Verification Token Email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { user: rest, success: "Confirmation Email Sent!" };
};
