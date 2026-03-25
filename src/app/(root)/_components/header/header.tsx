"use client"

import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import Logo from "@/src/components/logo";

export function Header() {
const router = useRouter();

   return (
      <nav className={"flex items-center justify-between px-8 py-2  shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]"}>
      
         <Logo/>
         <div className="flex items-center gap-1 text-lg transition-all duration-300">
            <Button variant="buttonlink" onClick={() => router.push("/dashboard")}
            >Log In</Button>
            <Button variant="custom" size="lg">Sign Up</Button>
         </div>
      </nav>
   )
}

