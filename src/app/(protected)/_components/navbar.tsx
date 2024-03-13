"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";
import { Sidebar, SiderBarItem } from "@/components/sidebar";

import {
  LayoutDashboard,
  BarChart3,
  UserCircle,
  Boxes,
  Package,
  Receipt,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SiderBarItem
        id={1}
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        href="/dashboard"
        active={pathname === "/dashboard" ? true : false}
        alert
      />
      <SiderBarItem
        id={2}
        icon={<BarChart3 size={20} />}
        text="Statistics"
        active={pathname === "/admin" ? true : false}
        href="/admin"
      />
      <SiderBarItem
        id={3}
        icon={<UserCircle size={20} />}
        text="Users"
        href="/client"
        active={pathname === "/client" ? true : false}
      />
      <SiderBarItem
        id={4}
        icon={<Boxes size={20} />}
        text="Inventory"
        href="/client"
        active={pathname === "/client" ? true : false}
      />
      <SiderBarItem
        id={5}
        icon={<Package size={20} />}
        text="Orders"
        href="/server"
        active={pathname === "/server" ? true : false}
      />
      <SiderBarItem
        id={6}
        icon={<Receipt size={20} />}
        text="Billings"
        href="/server"
        active={pathname === "/server" ? true : false}
      />
      <hr className="my-3" />
      <SiderBarItem
        id={7}
        icon={<Settings size={20} />}
        text="Settings"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={8}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={9}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={10}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={11}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={12}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={13}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={14}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={15}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={16}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <SiderBarItem
        id={17}
        icon={<LifeBuoy size={20} />}
        text="Help"
        href="/settings"
        active={pathname === "/settings" ? true : false}
      />
      <AnimatedTooltip items={people} />
    </Sidebar>
  );
  // return (
  //   <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
  //     <div className="flex gap-x-2">
  //       <Button
  //         asChild
  //         variant={pathname === "/server" ? "default" : "outline"}
  //       >
  //         <Link href="/server">Server</Link>
  //       </Button>
  //       <Button
  //         asChild
  //         variant={pathname === "/client" ? "default" : "outline"}
  //       >
  //         <Link href="/client">Client</Link>
  //       </Button>
  //       <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
  //         <Link href="/admin">Admin</Link>
  //       </Button>
  //       <Button
  //         asChild
  //         variant={pathname === "/settings" ? "default" : "outline"}
  //       >
  //         <Link href="/settings">Settings</Link>
  //       </Button>
  //     </div>
  //     <UserButton />
  //   </nav>
};

export default Navbar;
