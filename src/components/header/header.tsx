// src/components/header/header.tsx
import { createClient } from '@/src/lib/supabase/server'
import { AuthButton } from './authbutton'
import Logo from "@/src/components/logo"

export async function Header() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims() 
  const user = data?.claims ?? null

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
      <Logo />
      <AuthButton user={user} />
    </header>
  )
}