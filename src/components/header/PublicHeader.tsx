'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import Logo from "../logo"
import { usePublicHeader } from "@/src/components/header/_hooks/usePublicHeader"

import type { User } from '@supabase/supabase-js'

interface PublicHeaderProps {
   initialUser: User | null
}

export function PublicHeader({ initialUser }: PublicHeaderProps) {
   const { user, logout } = usePublicHeader(initialUser)
   const router = useRouter()

   return (
      <header className="
         h-18
         flex items-center justify-between 
         px-8
         bg-white 
         shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]
      ">
         <Logo />
         {user ? (
         <div className="flex gap-3 items-center justify-center">
            <Button variant="buttonlink" onClick={() => router.push("/dashboard")}>
               Dashboard
            </Button>
            <button
               onClick={logout}
               className="
               bg-[var(--primary-color)] text-white text-[18px]
               hover:bg-[var(--primary-color-dark)] text-sm px-4 py-2 rounded-xl cursor-pointer
               "
            >
               Logout
            </button>
         </div>
         ) : (
         <div className="flex gap-3 items-center justify-center">
            <Button variant="buttonlink" onClick={() => router.push("/auth/login")}>
               Sign In
            </Button>
            <button
               onClick={() => router.push("/auth/sign-up")}
               className="
               bg-[var(--primary-color)] text-white text-[18px]
               hover:bg-[var(--primary-color-dark)] text-sm px-4 py-2 rounded-xl cursor-pointer
               "
            >
               Sign Up
            </button>
         </div>
         )}
      </header>
   )
}