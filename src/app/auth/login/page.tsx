"use client";

import React, { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

// Overlay Images
import LeftOverlayImage from "@/assets/left-overlay.avif";
import RightOverlayImage from "@/assets/right-overlay.avif";

import { CardSlideWrapper } from "@/components/auth/card-slide-wrapper";
import { Terms } from "@/components/auth/terms";
import { OverlayContainer } from "@/components/auth/overlay-container";

const AuthPage = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <div className="bg-[#c9d6ff] bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] flex items-center justify-center flex-col min-h-full w-full p-2">
      {/* Container */}
      <div className="bg-white min-w-[450px] p-2 rounded-md shadow-md overflow-hidden relative min-h-[550px] w-[768px] hidden md:block">
        {/* Sign Up Form Container */}
        <div
          className={`absolute top-0 h-full transition-all left-0 w-1/2 z-[1] opacity-0 ${
            toggle !== true ? "translate-x-full z-[5] opacity-100" : ""
          }`}
        >
          <CardSlideWrapper
            headerLabel={"Get Started Now"}
            showSocial
            toggleButtonLabel={"SignIn"}
            toggleLabel={"Already a Member?"}
            setToggle={() => setToggle(true)}
          >
            <RegisterForm />
            <Terms />
          </CardSlideWrapper>
        </div>
        {/* Sign In Form Container */}
        <div
          className={`absolute top-0 h-full transition-all left-0 w-1/2 z-[2] ${
            toggle !== true ? "translate-x-full" : ""
          }`}
        >
          <CardSlideWrapper
            showSocial
            headerLabel={"Sign In"}
            toggleButtonLabel={"SignUp"}
            toggleLabel={"Not a Member?"}
            setToggle={() => setToggle(false)}
          >
            <LoginForm />
            <Terms />
          </CardSlideWrapper>
        </div>
        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all z-[5]  ${
            toggle !== true
              ? "-translate-x-full rounded-tr-[100px] rounded-br-[100px]"
              : "rounded-tl-[100px] rounded-bl-[100px]"
          }`}
        >
          {/* Overlay */}
          {/* Linear Gradient */}
          {/* bg-[#512da8] bg-gradient-to-r from-[#5c6bc0] to-[#512da8] */}
          <div
            className={`h-full bg-white text-white relative -left-full translate-x-0 transition-all w-[200%] ${
              toggle !== true ? "translate-x-1/2" : ""
            }`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center text-center left-0 translate-x-0 transition-all ${
                toggle !== true ? "translate-x-0" : ""
              } `}
            >
              <OverlayContainer
                label={"Welcome Back!"}
                content={
                  "To keep connected with us please login with your personal details"
                }
                imageUrl={LeftOverlayImage}
                toggle={() => setToggle(true)}
              >
                <span className="flex gap-x-1 items-center justify-between">
                  Sign In <ArrowRightIcon size={16} />
                </span>
              </OverlayContainer>
            </div>
            {/* Right Overlay Panel */}
            <div
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center text-center right-0 translate-x-0 transition-all ${
                toggle !== true ? "translate-x-1/4" : ""
              }`}
            >
              <OverlayContainer
                label={"New Here!"}
                content={
                  "Sign up and discover a comprehensive suite of features to enhance your experience."
                }
                imageUrl={RightOverlayImage}
                toggle={() => setToggle(false)}
              >
                <span className="flex gap-x-1 items-center justify-between">
                  <ArrowLeftIcon size={16} /> Sign Up
                </span>
              </OverlayContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
