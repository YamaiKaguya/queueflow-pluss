'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Accessibility  } from "lucide-react"

type QueueRow = {
   id: string
   ticket_no: number
   name: string | null
   service: string | null
   status: string
   created_at: string
   called_at: string | null
   served_at: string | null
   user_id: string | null
   priority: boolean
}

type Props = {
   allTickets: QueueRow[]
}


export function CurrentlyServingList({ allTickets }: Props) {
   const [page, setPage] = useState(0)
   const PAGE_SIZE = 5

   const serving = allTickets.filter((t) => t.status === 'serving')
   const waiting = allTickets.filter((t) => t.status === 'waiting')

   const start = page * PAGE_SIZE
   const end = start + PAGE_SIZE
   const paginatedWaiting = waiting.slice(start, end)

   const hasNext = end < waiting.length
   const hasPrev = page > 0

   const renderRow = (c: QueueRow) => (
      <div
         key={c.id}
         className={`text-blue-700 font-semibold flex items-center justify-between py-4 px-6 rounded-xl ${
         c.status === 'serving'
            ? "bg-blue-50 border border-blue-300 "
            : " border border-gray-200"
         }`}
      >

         <p className="font-semibold">
            {c.service?.charAt(0)} - {c.ticket_no} : {c.name ? c.name.toUpperCase() : ''}
         </p>

         <span className={c.priority ? "font-semibold" : "text-blue-600"}>
            {c.priority && (
               <span className="flex items-center gap-1  text-base font-semibold">
                  <Accessibility size={24} color='blue'/>
                  Priority
               </span>
            )}
         </span>
      </div>
   )

   return (
      <div className="bg-white rounded-[20px] p-10 shadow-sm flex flex-col">
         <h2 className="text-xl font-bold text-slate-600 tracking-wide mb-4">
            CURRENTLY SERVING
         </h2>

         {/* SERVING SECTION */}
         <section className="mb-2">
            {serving.length === 0 ? (
               <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400 mb-2">
                  No tickets being served.
               </div>
            ) : (
               <div className="flex flex-col gap-1 mb-2">
                  {serving.map(renderRow)}
               </div>
            )}

         {/* WAITING SECTION */}
            <div className="flex flex-col gap-1">
               {paginatedWaiting.map(renderRow)}
            </div>
         </section>

         {/* PAGINATION */}
         <div className="mx-auto mt-4 gap-2 flex">
         <button
            title='Previous Page'   
            onClick={() => setPage((p) => p - 1)}
            disabled={!hasPrev}
            className="px-4 py-2 rounded-lg bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <ChevronLeft size={18} />
         </button>

         <button
            title='Next Page'
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <ChevronRight size={18} />
         </button>
         </div>
      </div>
   )
}