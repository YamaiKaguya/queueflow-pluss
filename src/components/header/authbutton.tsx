// src/components/header/authbutton.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { Button } from "@/src/components/ui/button"
import { Bell, UserCircle } from 'lucide-react'

type Claims = {
   email?: string
   sub?: string
} | null

   type Props = { user: Claims }

   export function AuthButton({ user }: Props) {
   const router   = useRouter()
   const pathname = usePathname()
   const supabase = useMemo(() => createClient(), [])
   const isDashboard = pathname.startsWith('/dashboard')

   const logout = async () => {
      await supabase.auth.signOut()
   }

   if (user) {
      if (isDashboard) {
         return (
         <div className="flex items-center gap-2">
            <button title='bell' className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <button
               onClick={() => router.push('/dashboard/profile')}
               className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
               <UserCircle size={20} className="text-slate-500" />
               <span className="text-sm font-medium text-slate-700">
               {user.email?.split('@')[0]}
               </span>
            </button>
         </div>
         )
      }

      return (
         <div className="flex items-center gap-3">
         <Button
            variant="buttonlink"
            onClick={() => { router.push('/dashboard'); router.refresh() }}
            className="flex items-center gap-2"
         >
            Dashboard
         </Button>
         <button
            onClick={logout}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
         >
            Log out
         </button>
         </div>
      )
   }

   return (
      < a
         href="/login"
         className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
      >
         Log in
      </a>
   )
}