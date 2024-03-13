"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL");

  const onClick = (
    provider: "google" | "github" | "facebook" | "linkedin" | "twitter"
  ) => {
    signIn(provider, {
      callbackUrl: callbackURL || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center justify-between w-full my-4">
      <Button
        variant="outline"
        size="icon"
        className="bg-white hover:bg-white/80 hover:ring-2 hover:text-gray-700 font-medium rounded-full text-xl p-1 text-center inline-flex items-center"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="outline"
        size="icon"
        className="text-white border bg-github hover:bg-github/80 hover:ring-2 hover:text-gray-700 font-medium rounded-full text-xl p-1 text-center inline-flex items-center"
        onClick={() => onClick("github")}
      >
        <TbBrandGithubFilled className="h-5 w-5" />
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="outline"
        size="icon"
        className="text-white border bg-facebook hover:bg-facebook/80 hover:ring-2 hover:text-gray-700 font-medium rounded-full text-xl p-1 text-center inline-flex items-center"
        onClick={() => onClick("facebook")}
      >
        <FaFacebookF className="h-5 w-5" />
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="outline"
        size="icon"
        className="text-white border bg-linkedin hover:bg-linkedin/80 hover:ring-2 hover:text-gray-700 font-medium rounded-full text-xl p-1 text-center inline-flex items-center"
        onClick={() => onClick("linkedin")}
      >
        <FaLinkedinIn className="h-5 w-5" />
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="outline"
        size="icon"
        className="text-white border bg-twitter hover:bg-twitter/80 hover:ring-2 hover:text-gray-700 font-medium rounded-full text-xl p-1 text-center inline-flex items-center"
        onClick={() => onClick("twitter")}
      >
        <FaTwitter className="h-5 w-5" />
      </Button>
    </div>
  );
};
