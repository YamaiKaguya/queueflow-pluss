'use client'

import { useState } from 'react'
import { cn } from "@/src/lib/utils"
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import Link from 'next/link'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
const [email, setEmail] = useState('')
const [error, setError] = useState<string | null>(null)
const [success, setSuccess] = useState(false)
const [isLoading, setIsLoading] = useState(false)

const handleForgotPassword = async (e: React.FormEvent) => {
   e.preventDefault()
   const supabase = createClient()
   setIsLoading(true)
   setError(null)
   try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      setSuccess(true)
   } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
   } finally {
      setIsLoading(false)
   }
}

   return (
      <div className={cn('flex min-h-screen w-full items-center justify-center bg-[#f0f4ff] px-4', className)} {...props}>
         <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

         {success ? (
            <>
               <p className="text-base text-gray-400 mb-1">All done!</p>
               <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4 tracking-tight">
               Check your email
               </h1>
               <p className="text-sm text-gray-500 leading-relaxed">
               If you registered using your email and password, you will receive a password reset email shortly.
               </p>
               <Link
               href="/auth/login"
               className="inline-block mt-6 text-sm text-[#4395ff] hover:text-[#2d78e6] font-medium transition-colors"
               >
               Back to login
               </Link>
            </>
         ) : (
            <>
               <p className="text-base text-gray-400 mb-1">Forgot your password?</p>
               <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8 tracking-tight">
               Reset Password
               </h1>
               <p className="text-sm text-gray-500 leading-relaxed mb-8">
               Type in your email and we&apos;ll send you a link to reset your password
               </p>

               <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
               <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     type="email"
                     placeholder="m@example.com"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 transition-all h-auto"
                  />
               </div>

               {error && (
                  <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-500">
                     {error}
                  </div>
               )}

               <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full !bg-[var(--primary-color)] hover:!bg-[#2d78e6] text-white font-semibold !text-base py-3 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed h-auto mt-1 cursor-pointer"
               >
                  {isLoading ? 'Sending...' : 'Send reset email'}
               </Button>
               </form>

               <p className="text-center text-xs text-gray-400 mt-6">
               Already have an account?{' '}
               <Link
                  href="/auth/login"
                  className="text-[#4395ff] font-semibold hover:text-[#2d78e6] transition-colors"
               >
                  Login
               </Link>
               </p>
            </>
         )}
         </div>
      </div>
   )
}