"use client";

import React, { useState } from "react";
import Image from "next/image";
import FrontImage from "@/assets/left-overlay.avif";
import { Button } from "../ui/button";

interface FlipCardProps {
  children: React.ReactNode;
}

export const FlipCard = ({ children }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean | undefined>(false);

  return (
    <div
      className="w-full h-full mx-auto mt-[50px]"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`w-full h-full transition-transform duration-1000 transform-style-3d cursor-pointer relative ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* CARD FRONT*/}
        <div className="absolute w-full h-full backface-hidden rounded-md overflow-hidden shadow-md bg-gradient-to-br from-[#ffce00] to-[#FE4880] flex flex-col gap-y-4 items-center justify-center">
          {/* <h2 className="text-white text-xl">Developer Card</h2> */}
          {children}
          <Button onClick={() => setIsFlipped(!isFlipped)}>CLICK ME</Button>
        </div>
        {/* CARD BACK */}
        <div className="absolute w-full h-full backface-hidden rounded-md overflow-hidden shadow-md bg-[#F3F3F3] rotate-y-180">
          {/* CONTENT */}
          <div className="w-full h-full ">
            <div className="relative px-[30px] pt-[30px] pb-[40px] after:content-[''] after:block after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:-z-[1] after:rounded-br-[50%] after:bg-gradient-to-bl from-[#FFCE00] to-[#FE4880]">
              <Image
                src={FrontImage}
                alt={""}
                className="w-[128px] h-[128px] mx-auto block mb-4 object-cover bg-white border-[5px] border-white rounded-[50%]"
              />
              <h2 className="text-white text-lg font-black uppercase text-center">
                Insaf Nilam
              </h2>
            </div>
            {/* BODY */}
            <div className="p-8">
              <h3 className="text-[#212121] text-base mb-3 font-black uppercase text-center">
                JavaScript Wizard
              </h3>
              <p className="text-[#212121] text-sm leading-normal text-justify">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
                vel repellat cupiditate suscipit blanditiis nostrum quos et
                perspiciatis distinctio, earum, sunt possimus a quae fugiat hic
                consequatur. Dicta, architecto rerum!
              </p>
              <Button onClick={() => setIsFlipped(!isFlipped)}>CLICK ME</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
