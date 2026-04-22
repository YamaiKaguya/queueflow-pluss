'use client'
import { useState, useRef, useEffect } from "react"
import { Bell, CheckCircle } from "lucide-react"
import { useNotifications } from "../_hooks/useNotification"

export default function Notification() {
   const [open, setOpen] = useState(false)
   const ref = useRef<HTMLDivElement>(null)
   const { notifs, loading, markOneRead, markAllRead } = useNotifications()
   const unreadCount = notifs.filter((n) => !n.read).length

   // CLOSE ON OUTSIDE CLICK
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
         {/* BELL BUTTON */}
         <button
         onClick={() => setOpen((o) => !o)}
         className="relative p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
         >
         <Bell size={22} />
         {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
         )}
         </button>

         {/* DROPDOWN */}
         {open && (
         <div className="absolute right-0 mt-3 w-96 p-2 rounded-2xl border border-gray-200 shadow-md bg-white z-50">
            
            {/* HEADER */}
            <div className="px-3 py-3 mb-1">
               <p className="font-semibold text-base text-gray-900">Notifications</p>
               <p className="text-sm text-gray-400">
               {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
               </p>
            </div>

            <div className="max-h-80 overflow-auto">
               <div className="border-t border-gray-100 mb-1" />

               {/* LOADING */}
               {loading && (
               <div className="px-3 py-4 text-sm text-gray-400 text-center">
                  Loading...
               </div>
               )}

               {/* EMPTY STATE */}
               {!loading && notifs.length === 0 && (
               <div className="px-3 py-4 text-sm text-gray-400 text-center">
                  No notifications
               </div>
               )}

               {/* NOTIFICATION ROWS */}
               {!loading && notifs.map((notif) => (
               <button
                  key={notif.id}
                  onClick={() => markOneRead(notif.id)}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
                     !notif.read ? "bg-gray-50" : ""
                  }`}
               >
                  <CheckCircle
                     size={18}
                     className={notif.read ? "text-gray-400" : "text-blue-500"}
                  />
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
               </button>
               ))}
            </div>

            {/* MARK ALL AS READ */}
            {!loading && unreadCount > 0 && (
               <>
               <div className="border-t border-gray-100 mt-1 mb-1" />
               <button
                  onClick={markAllRead}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition"
               >
                  <span className="text-sm font-medium">Mark all as read</span>
               </button>
               </>
            )}
         </div>
         )}
      </div>
   )
}