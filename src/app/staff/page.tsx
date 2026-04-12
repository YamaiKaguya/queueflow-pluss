// app/staff/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type TicketStatus = 'waiting' | 'serving' | 'done' | 'skipped' | 'no-show'

type QueueRow = {
   id: string
   ticket_no: number
   service: string | null
   status: TicketStatus
   created_at: string
   called_at: string | null
   served_at: string | null
}

const STATUS_BADGE: Record<TicketStatus, string> = {
   waiting:  'bg-yellow-100 text-yellow-700',
   serving:  'bg-blue-100 text-blue-700',
   done:     'bg-green-100 text-green-700',
   skipped:  'bg-gray-100 text-gray-500',
   'no-show':'bg-red-100 text-red-500',
}

export default function StaffDashboard() {
   const [queue, setQueue] = useState<QueueRow[]>([])
   const [loading, setLoading] = useState(true)
   const [actionLoading, setActionLoading] = useState<string | null>(null) // ticket id being acted on

   const supabase = createClient()

  // ── Initial fetch ─────────────────────────────────────────────────
   useEffect(() => {
      const fetchQueue = async () => {
         const { data, error } = await supabase
         .from('queue')
         .select('*')
         .not('status', 'in', '("done","skipped","no-show")')
         .order('ticket_no', { ascending: true })

         if (error) { console.error(error); return }
         setQueue(data ?? [])
         setLoading(false)
      }

      void fetchQueue()
   })

  // ── Realtime ──────────────────────────────────────────────────────
useEffect(() => {
   const channel = supabase
      .channel('staff-dashboard')
      .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'queue' },
      (payload: RealtimePostgresChangesPayload<QueueRow>) => {
         if (!payload.new || !('status' in payload.new)) return
         const updated = payload.new

         if (['done', 'skipped', 'no-show'].includes(updated.status)) {
            // Remove from the active list after a short delay so staff can see the change
            setTimeout(() => {
            setQueue((prev) => prev.filter((t) => t.id !== updated.id))
            }, 2000)
            // But update the status immediately so the badge changes
            setQueue((prev) =>
            prev.map((t) => (t.id === updated.id ? { ...t, status: updated.status } : t))
            )
            return
         }

         setQueue((prev) => {
            const exists = prev.find((t) => t.id === updated.id)
            if (exists) {
            return prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
            }
            return [...prev, updated].sort((a, b) => a.ticket_no - b.ticket_no)
         })
      }
      )
      .subscribe()

   return () => { void supabase.removeChannel(channel) }
}, [supabase])

  // ── Actions ───────────────────────────────────────────────────────
const callNext = async () => {
   const next = queue.find((t) => t.status === 'waiting')
   if (!next) return

   setActionLoading(next.id)
   const { error } = await supabase
   .from('queue')
   .update({ status: 'serving', called_at: new Date().toISOString() })
   .eq('id', next.id)

   if (error) console.error(error)
   setActionLoading(null)
}

const updateStatus = async (id: string, status: TicketStatus) => {
   setActionLoading(id)

   const updates: Partial<QueueRow> = { status }
   if (status === 'done') updates.served_at = new Date().toISOString()

   const { error } = await supabase
      .from('queue')
      .update(updates)
      .eq('id', id)

   if (error) console.error(error)
   setActionLoading(null)
}

   // ── Derived state ─────────────────────────────────────────────────
const serving = queue.filter((t) => t.status === 'serving')
const waiting = queue.filter((t) => t.status === 'waiting')
const hasNext  = waiting.length > 0

if (loading) {
   return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading queue...</p>
      </main>
   )
}

   return (
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">

      {/* ── Header ── */}
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
               {serving.length} serving · {waiting.length} waiting
            </p>
         </div>
         <button
            onClick={callNext}
            disabled={!hasNext || actionLoading !== null}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-all"
         >
            {actionLoading && !queue.find(t => t.id === actionLoading)
            ? 'Calling...'
            : `Call Next ${hasNext ? `(#${waiting[0].ticket_no})` : ''}`}
         </button>
      </header>

      {/* ── Currently Serving ── */}
      <section>
         <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Currently Serving</p>
         {serving.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400">
               No tickets being served. Hit &quot;Call Next&quot; to start.
            </div>
         ) : (
            <div className="grid gap-3">
               {serving.map((ticket) => (
               <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  actionLoading={actionLoading}
                  onDone={() => updateStatus(ticket.id, 'done')}
                  onSkip={() => updateStatus(ticket.id, 'skipped')}
                  onNoShow={() => updateStatus(ticket.id, 'no-show')}
               />
               ))}
            </div>
         )}
      </section>

      {/* ── Waiting Queue ── */}
      <section>
         <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
            Waiting — {waiting.length} ticket{waiting.length !== 1 ? 's' : ''}
         </p>
         {waiting.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400">
               Queue is empty.
            </div>
         ) : (
            <div className="grid gap-3">
               {waiting.map((ticket, index) => (
               <div
                  key={ticket.id}
                  className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm"
               >
                  <div className="flex items-center gap-4">
                     <span className="text-gray-300 text-sm w-5 text-right">{index + 1}</span>
                     <span className="text-2xl font-bold text-gray-800">#{ticket.ticket_no}</span>
                     {ticket.service && (
                     <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {ticket.service}
                     </span>
                     )}
                  </div>
                  <span className="text-xs text-gray-400">
                     {new Date(ticket.created_at).toLocaleTimeString()}
                  </span>
               </div>
               ))}
            </div>
         )}
         </section>
      </main>
   )
}

// ── Ticket Card Component ─────────────────────────────────────────────
type TicketCardProps = {
   ticket: QueueRow
   actionLoading: string | null
   onDone: () => void
   onSkip: () => void
   onNoShow: () => void
}

function TicketCard({ ticket, actionLoading, onDone, onSkip, onNoShow }: TicketCardProps) {
   const isLoading = actionLoading === ticket.id

   return (
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4">
         <span className="text-4xl font-bold text-blue-600">#{ticket.ticket_no}</span>
         <div className="space-y-1">
            {ticket.service && (
               <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
               {ticket.service}
               </span>
            )}
            <span className={`block text-xs px-3 py-1 rounded-full w-fit ${STATUS_BADGE[ticket.status]}`}>
               {ticket.status}
            </span>
         </div>
         </div>

         <div className="flex items-center gap-2">
         <button
            onClick={onDone}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
         >
            ✓ Done
         </button>
         <button
            onClick={onSkip}
            disabled={isLoading}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-all"
         >
            Skip
         </button>
         <button
            onClick={onNoShow}
            disabled={isLoading}
            className="bg-red-100 hover:bg-red-200 disabled:opacity-40 text-red-600 text-sm font-medium px-4 py-2 rounded-xl transition-all"
         >
            No-show
         </button>
         </div>
      </div>
   )
}


// !REMOVE THE DATA FROM QUEUEU DATABSE AND PUT ITTO HISTORY THEN DELETE IT FROM QUEUE DATABASE