import React from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface OverlayContainerProps {
  label: string;
  content: string;
  imageUrl: StaticImageData;
  toggle: Function;
  children: React.ReactNode;
}

export const OverlayContainer = ({
  imageUrl,
  toggle,
  label,
  content,
  children,
}: OverlayContainerProps) => {
  return (
    <DirectionAwareHover imageUrl={imageUrl} className="h-full w-full">
      <div className="z-50 flex flex-col justify-center items-center">
        <h1 className="text-2xl bg-gradient-to-br from-slate-300 bg-clip-text text-center to-slate-500 font-bold tracking-tight text-transparent ">
          {label}
        </h1>
        <p className="font-bold text-sm text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          {content}
        </p>
        <Button
          onClick={() => toggle()}
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
        >
          {children}
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </Button>
      </div>
    </DirectionAwareHover>
  );
};
