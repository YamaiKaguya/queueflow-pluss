'use client'

import { createClient } from "@/src/lib/supabase/client"
import { useEffect, useState } from "react"

import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export type User = {
   email?: string
   id?: string
} | null

export function usePublicHeader(initialUser: SupabaseUser | null = null) {
   const supabase = createClient()
   const [user, setUser] = useState<User>(() => 
      initialUser ? { email: initialUser.email, id: initialUser.id } : null
   )

   useEffect(() => {
      const { data: listener } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session: Session | null) => {
               if (session?.user) {
                  setUser({ email: session.user.email, id: session.user.id })
               } else {
                  setUser(null)
               }
            }
      )

      return () => listener.subscription.unsubscribe()
   }, [supabase])

   const logout = async () => {
      await supabase.auth.signOut()
   }

   return {
      user,
      logout,
   }
}
