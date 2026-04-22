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

      {/* SERVING */}
<div className="mb-6">
   {(serving.length > 0 || waiting.length > 0) && serving.length > 0 && (
      <div className="flex items-center justify-between mb-3">
         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Serving
         </h3>
         <span className="text-xs text-gray-400">{serving.length}</span>
      </div>
   )}

   {serving.length === 0 && waiting.length === 0 ? (
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
         <p className="text-gray-500 font-medium">No queues at the moment</p>
         <p className="text-sm text-gray-400 mt-1">
            Everything is currently idle
         </p>
      </div>
   ) : serving.length > 0 ? (
      <div>
         {serving.map(renderRow)}
      </div>
   ) : (
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center text-sm text-gray-400">
         No one is currently being served
      </div>
   )}
</div>

{/* WAITING */}
<div>
   {waiting.length > 0 && (
      <div className="flex items-center justify-between mb-3">
         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            Waiting
         </h3>
         <span className="text-xs text-gray-400">{waiting.length}</span>
      </div>
   )}

   {waiting.length === 0 ? (
      serving.length > 0 ? (
         <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center text-sm text-gray-400">
            No one is waiting
         </div>
      ) : null
   ) : (
      <div>
         {waiting.map(renderRow)}
      </div>
   )}
</div>

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