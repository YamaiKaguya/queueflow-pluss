'use client'

import { useState, useRef, useEffect } from "react"
import { Bell, CheckCircle } from "lucide-react"
import { useNotifications } from "../_hooks/useNotification"

export default function Notification() {
   const [open, setOpen] = useState(false)
   const ref = useRef<HTMLDivElement>(null)

   const { notifs, markOneRead, markAllRead } = useNotifications()

   const unreadCount = notifs.filter((n) => !n.read).length

   // 🔹 Close on outside click
   useEffect(() => {
      const handler = (e: MouseEvent) => {
         if (ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false)
         }
      }
      document.addEventListener("mousedown", handler)
      return () => document.removeEventListener("mousedown", handler)
   }, [])

   return (
      <div className="relative" ref={ref}>
         {/* 🔔 Trigger */}
         <button
            onClick={() => setOpen((o) => !o)}
            className="relative p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
         >
            <Bell size={22} />
            {unreadCount > 0 && (
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
            )}
         </button>

         {/* 📦 Panel */}
         {open && (
            <div className="absolute right-0 mt-3 w-84 p-2 rounded-2xl border border-gray-200 shadow-md bg-white z-50">

               {/* Header */}
               <div className="px-3 py-3 mb-1">
                  <p className="font-semibold text-base text-gray-900">Notifications</p>
                  <p className="text-sm text-gray-400">
                     {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                  </p>
               </div>

               <div className="border-t border-gray-100 mb-1" />

               {/* Items */}
               {notifs.length === 0 && (
                  <div className="px-3 py-4 text-sm text-gray-400 text-center">
                     No notifications
                  </div>
               )}

               {notifs.map((notif) => (
                  <div
                     key={notif.id}
                     onClick={() => markOneRead(notif.id)}
                     className={`flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
                        !notif.read ? "bg-gray-50" : ""
                     }`}
                  >
                     <CheckCircle size={18} className="text-gray-400" />

                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">
                           {notif.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                           {new Date(notif.created_at).toLocaleString()}
                        </p>
                     </div>

                     {!notif.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1.5" />
                     )}
                  </div>
               ))}

               {/* Footer */}
               {unreadCount > 0 && (
                  <>
                     <div className="border-t border-gray-100 mt-1 mb-1" />
                     <div
                        onClick={markAllRead}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                     >
                        <span className="text-sm font-medium">Mark all as read</span>
                     </div>
                  </>
               )}
            </div>
         )}
      </div>
   )
}