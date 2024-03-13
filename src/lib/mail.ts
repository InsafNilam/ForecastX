import { Resend } from "resend";
import { VerifyEmailTemplate } from "@/components/verify-template";
import { PasswordEmailTemplate } from "@/components/password-email-template";
import { TwoFactorEmailTemplate } from "@/components/two-factor-email-template";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "2FA Code",
    react: TwoFactorEmailTemplate({ token }),
    text: "",
    // html: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    return NextResponse.json({ error });
  }

  NextResponse.json({ data });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Hello world",
    react: PasswordEmailTemplate({ resetLink }),
    text: "",
    // html: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    return NextResponse.json({ error });
  }

  NextResponse.json({ data });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Hello world",
    react: VerifyEmailTemplate({ confirmLink }),
    text: "",
    // html: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    return NextResponse.json({ error });
  }

  NextResponse.json({ data });
};
