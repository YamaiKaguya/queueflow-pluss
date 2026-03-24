"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/QueueFlow+.png";
import NavButton from "@/src/components/header/_components/navbutton"
import BellIcon from "@/src/components/header/_svgs/bell"

import { User, Settings, LogOut } from "lucide-react";

import {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu"; 

export default function DashboardLayout() {
   const router = useRouter();

   return (
      <>
         <header className="flex items-center justify-between px-7 py-2 shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
               <div className="flex items-center gap-10">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push("/")}>
                     <Image src={logo} alt="QueueFlow Logo" className="max-w-11" />
                     <h1 className="text-lg font-semibold">QueueFlow+</h1>
                  </div>
                  <div className="flex items-center gap-5 text-lg">
                     <NavButton href="/dashboard">Dashboard</NavButton>
                     <NavButton href="/joinqueue">Join Queue</NavButton>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <button className="relative p-2 text-gray-500 rounded-full bg-linear-to-br from-gray-50 to-gray-200  hover:text-gray-700 transition-colors" title="notif">
                     <BellIcon className="w-4.5 h-4.5 text-gray-600 hover:text-gray-900" />
                     <span className="absolute top-2 right-2 w-1 h-1 bg-blue-500 rounded-full" />
                  </button>

                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 cursor-pointer
                     flex items-center justify-center text-sm font-semibold text-gray-700 
                     shadow-sm hover:shadow-md transition">
                     JD
                     </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent 
                  align="end" 
                  className="w-44 p-2 rounded-xl shadow-xs border bg-white"
                  >
                  <DropdownMenuItem
                     onClick={() => router.push("/profile")}
                     className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm 
                     hover:bg-gray-100 transition"
                  >
                     <User size={16} />
                     Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     onClick={() => router.push("/settings")}
                     className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm 
                     hover:bg-gray-100 transition"
                  >
                     <Settings size={16} />
                     Settings
                  </DropdownMenuItem>

                  <div className="my-1 border-t" />

                  <DropdownMenuItem
                     onClick={() => router.push("/")}
                     className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm 
                     text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                     <LogOut size={16} />
                     Logout
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-base text-gray-700 font-medium">John Doe</span>
               </div>
         </header>
      </>
   );
}