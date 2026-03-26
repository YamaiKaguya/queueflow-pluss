'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from "@/src/lib/utils"
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import Link from 'next/link'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState<string | null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      const supabase = createClient()
      setIsLoading(true)
      setError(null)
      try {
         const { error } = await supabase.auth.signInWithPassword({ email, password })
         if (error) throw error
         router.push('/')
      } catch (error: unknown) {
         setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div
         className={cn(
         'relative flex flex-col items-center justify-center min-h-[calc(100vh-100px)]')}{...props}
      >

         <div className="relative w-full max-w-md px-4">
         <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#4395ff]/10 shadow-xl shadow-[#4395ff]/10 px-9 py-10">

            {/* Logo mark */}
            <div className="flex justify-center mb-6">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4395ff] to-[#2d78e6] flex items-center justify-center shadow-lg shadow-[#4395ff]/30">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 22V12M3 7l9 5 9-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
               </svg>
               </div>
            </div>

            <h1 className="text-center text-2xl font-bold text-gray-900 tracking-tight mb-1">
               Welcome back
            </h1>
            <p className="text-center text-sm text-gray-500 mb-7">
               Sign in to your QueueFlow+ account
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
               <div className="flex flex-col gap-1.5">
               <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email address
               </Label>
               <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-2.5 transition-all"
               />
               </div>

               <div className="flex flex-col gap-1.5">
               <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                     Password
                  </Label>
                  <Link
                     href="/auth/forgot-password"
                     className="text-xs font-medium text-[#4395ff] hover:text-[#2d78e6] transition-colors"
                  >
                     Forgot password?
                  </Link>
               </div>
               <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-2.5 transition-all"
               />
               </div>

               {error && (
               <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-500">
                  {error}
               </div>
               )}

               <Button
               type="submit"
               disabled={isLoading}
               className="w-full bg-gradient-to-r from-[#4395ff] to-[#2d78e6] hover:from-[#2d78e6] hover:to-[#1a65d6] text-white font-semibold text-sm py-2.5 rounded-xl shadow-md shadow-[#4395ff]/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
               >
               {isLoading ? 'Signing in...' : 'Sign in'}
               </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
               Don&apos;t have an account?{' '}
               <Link
               href="/auth/sign-up"
               className="text-[#4395ff] font-semibold hover:text-[#2d78e6] transition-colors"
               >
               Sign up
               </Link>
            </p>

         </div>
         </div>
      </div>
   )
}