"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, ChevronFirst, ChevronLast } from "lucide-react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { ScrollArea } from "./ui/scroll-area";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface SideBarContextInterface {
  expanded: Boolean | null;
  setHoveredIndex: Dispatch<SetStateAction<number | null>>;
}

const SidebarContext = createContext<SideBarContextInterface>({
  expanded: null,
  setHoveredIndex: () => {},
});

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <aside className="h-full">
      <nav className="h-full flex flex-col bg-white shadow-sm sticky top-0 bottom-0 left-0 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-2xl">
        <div className="p-4 pb-2 flex justify-between items-center sticky top-0 z-10 bg-white rounded-tr-2xl rounded-tl-2xl">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <Button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 text-black hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>
        <SidebarContext.Provider value={{ expanded, setHoveredIndex }}>
          <ScrollArea>
            <ul className="flex-1 px-3">{children}</ul>
          </ScrollArea>
        </SidebarContext.Provider>
        <AnimatePresence mode="wait">
          {hoveredIndex && (
            <motion.div
              initial={{
                opacity: 0,
                y: mousePosition.y + 20,
                scale: 0.6,
                x: 130,
              }}
              animate={{
                opacity: 1,
                y: mousePosition.y + 20,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{
                opacity: 0,
                y: mousePosition.y + 20,
                scale: 0.6,
                x: 130,
              }}
              style={{
                translateX: translateX,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
              <div className="font-bold text-white relative z-30 text-base">
                {"HELLO"}
              </div>
              <div className="text-white text-xs">{"World"}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="border-t flex p-3 z-10 bg-white sticky bottom-0 rounded-br-2xl rounded-bl-2xl">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export const SiderBarItem = ({
  icon,
  id,
  text,
  href,
  active,
  alert,
}: {
  icon: React.ReactNode;
  id: number;
  text: String;
  href: Url;
  active?: Boolean;
  alert?: Boolean;
}) => {
  const { expanded, setHoveredIndex } =
    useContext<SideBarContextInterface>(SidebarContext);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHoveredIndex(id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
        {!expanded && (
          <div
            className={`absolute left-full z-10 rounded-md px-2 py-1 ml-8 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};
