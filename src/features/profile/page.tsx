'use client'

import { useEffect } from 'react'
import PatientProfile from '@/src/features/profile/_components/Profile'
import VisitHistory from '@/src/features/profile/_components/History'
import { useProfile } from './_hooks/useProfile'


export default function ProfilePage() {
   const { profile, loading, error, retrieveData } = useProfile()

   useEffect(() => {
      retrieveData()
   }, [retrieveData])

   if (loading) return <p className="p-8">Loading...</p>
   if (error) return <p className="p-8 text-red-500">{error}</p>
   if (!profile) return <p className="p-8">No profile found</p>

   return (
      <div className="min-h-screen bg-[#F5F5F3] px-8 py-12">
         <div className="max-w-4xl mx-auto space-y-6">

            <div>
               <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
               <p className="text-base text-gray-400 mt-1.5">
                  Manage your personal information, and view history
               </p>
            </div>

            {/* 👇 PASS PROFILE HERE */}
            <PatientProfile profile={profile} />

            <VisitHistory />

         </div>
      </div>
   )
}