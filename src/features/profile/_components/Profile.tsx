'use client'

import { Phone, Mail, Calendar, Venus, IdCard, BadgeCheck } from 'lucide-react'
import { Pencil } from 'lucide-react'

import type { Database } from '@/src/types/supabase'
type Profile = Database['public']['Tables']['profiles']['Row']


export default function PatientProfile({ profile }: { profile: Profile }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">

        {/* Avatar + Name */}
        <div className="flex items-center gap-5 mb-8 ">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-700">
            {profile.full_name
                ? profile.full_name
                    .split(' ')
                    .map(name => name[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'U'}
            </div>

            <div>
                <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {/* {profile.full_name} */}
                    </h2>

                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <BadgeCheck size={13} />
                        Verified Account
                    </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
                    <IdCard size={14} />
                    User ID: {profile.id}
                </div>
            </div>

            <button className="ml-auto self-start bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer">
                <Pencil size={15} />
                Edit Profile
            </button>
        </div>

        {/* Section Label */}
        <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <IdCard size={16} className="text-blue-500" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Personal Details</h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {[
            { label: 'Phone Number', value: profile.phone_no, icon: <Phone size={15} className="text-gray-400" /> },
            { label: 'Email Address', value: profile.email, icon: <Mail size={15} className="text-gray-400" /> },
            { label: 'Birthday', value: profile.birth_date, icon: <Calendar size={15} className="text-gray-400" /> },
            { label: 'Gender', value: profile.gender, icon: <Venus size={15} className="text-gray-400" /> },
            ].map(({ label, value, icon }) => (
            <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    {label}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {icon}
                    {value || '—'}
                </div>
            </div>
            ))}
        </div>

        </div>
    )
}