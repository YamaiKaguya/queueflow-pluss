"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { createClient } from '@/src/lib/supabase/client';
import type { User } from "@supabase/supabase-js";

import { Bell, User as UserIcon, Settings, LogOut } from "lucide-react";
import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";

const navItems = [
   { href: "/dashboard", label: "Dashboard" },
   { href: "/joinqueue", label: "Join Queue" },
];

export default function DashboardLayout() {
   const router = useRouter();
   const pathname = usePathname();
   const [user, setUser] = useState<User | null>(null);

      const supabase = createClient();

   useEffect(() => {
      supabase.auth.getUser().then(({ data }) => setUser(data.user));

      // Listen for auth changes (login/logout)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
         setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
   }, []);

   const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push("/");
   };

   // Derive display name and initials from user metadata or email
   const fullName = user?.user_metadata?.full_name ?? user?.email ?? "User";
   const initials = fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

   console.log(user)

   return (
      <header className="
         flex items-center justify-between 
         px-8 py-2 
         bg-white 
         shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
         <Logo />

         {/* Nav — only show when logged in */}
         {user && (
         <nav className="flex items-center gap-1">
            {navItems.map(({ href, label }) => {
               const isActive = pathname === href;
               return (
               <Button
                  key={href}
                  onClick={() => router.push(href)}
                  variant="buttonlink"
                  className={`
                     ${isActive
                     ? "text-[var(--primary-color-dark)]"
                     : "text-gray-500 hover:text-gray-800"
                     }
                  `}
               >
                  {label}
               </Button>
               );
            })}
         </nav>
         )}

         <div className="flex items-center gap-3">
         {user ? (
            // ✅ Logged in — show notifications, avatar dropdown, name
            <>
               <button
               className="relative w-10 h-10 flex items-center justify-center hover:text-red-300 transition-all"
               title="Notifications"
               >
               <Bell className="w-5 h-5 text-gray-600" />
               <span className="absolute top-2.5 right-4 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-white" />
               </button>

               <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-xs font-bold text-white shadow-sm hover:shadow-md hover:scale-105 transition-all">
                     {initials}
                  </button>
               </DropdownMenuTrigger>

               <DropdownMenuContent
                  align="end"
                  className="w-44 p-1.5 rounded-xl shadow-lg border border-gray-100 bg-white"
               >
                  <div className="px-3 py-2 mb-1">
                     <p className="text-sm font-semibold text-gray-800">{fullName}</p>
                     <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <div className="border-t border-gray-100 mb-1" />

                  <DropdownMenuItem
                     onClick={() => router.push("/profile")}
                     className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                     <UserIcon size={14} />
                     Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     onClick={() => router.push("/settings")}
                     className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                     <Settings size={14} />
                     Settings
                  </DropdownMenuItem>

                  <div className="border-t border-gray-100 my-1" />

                  <DropdownMenuItem
                     onClick={handleLogout}
                     className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                     <LogOut size={14} />
                     Logout
                  </DropdownMenuItem>
               </DropdownMenuContent>
               </DropdownMenu>

               <span className="text-base font-medium text-gray-700">{fullName}</span>
            </>
         ) : (
            // 🔒 Logged out — show Sign In / Sign Up
            <div className="flex items-center gap-2">
               <Button
               variant="buttonlink"
               onClick={() => router.push("/signin")}
               className="text-gray-500 hover:text-gray-800"
               >
               Sign In
               </Button>
               <Button
               onClick={() => router.push("/signup")}
               className="bg-[var(--primary-color)] text-white hover:opacity-90"
               >
               Sign Up
               </Button>
            </div>
         )}
         </div>
      </header>
   );
}