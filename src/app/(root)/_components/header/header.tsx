"use client"

import logo from "@/public/QueueFlow+.png";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";


export function Header() {
const router = useRouter();

const handleClick = () => {
router.push("http://localhost:3000/dashboard");
};

   return (
      <nav className={"flex items-center justify-between px-7 py-2  shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]"}>
         <div className="flex items-center gap-1 cursor-pointer">
               <Image src={logo} alt="QueueFlow Logo" className="max-w-11" />
               <h1 className="text-lg font-semibold">
                  QueueFlow+
               </h1>
         </div>
         <div className="flex items-center gap-6   text-lg transition-all duration-300">
               <a className="text-lg hover:text-blue-600 cursor-pointer" onClick={handleClick}>Log In</a>
               <Button variant="custom" size="lg">
                  Sign Up
               </Button>
         </div>
      </nav>
   )
}

