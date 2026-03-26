'use client'

import { 
   JoinForm, 
   LiveBadge, 
   StatsRow, 
   TicketCard, 
   NewsFeed, 
   FacilityHours, 
   HelpCard} from "@/src/app/dashboard/_barrel/barrel";

import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type QueueRow = {
   id: string
   ticket_no: number
   service: string | null
   status: string
   created_at: string
   called_at: string | null
   served_at: string | null
}

type TicketInfo = { ticket_no: number; service: string }

export default function CustomerPage() {
   const [currentlyServing, setCurrentlyServing]   = useState<number | null>(null)
   const [waitingCount, setWaitingCount]           = useState(0)

   const [service, setService]                     = useState('')
   const [ticket, setTicket]                       = useState<TicketInfo | null>(null)
   const [position, setPosition]                   = useState(0)

   const [loading, setLoading]                     = useState(false)
   const [error, setError]                         = useState<string | null>(null)
   const [confirmed, setConfirmed]                 = useState(false)

   const supabase = useMemo(() => createClient(), [])

   useEffect(() => {
      const fetchState = async () => {
         const { data } = await supabase
         .from('queue')
         .select('ticket_no, status')
         .in('status', ['serving', 'waiting'])
         .order('ticket_no', { ascending: true })
         if (!data) return
         const serving = data.find((r) => r.status === 'serving')
         if (serving) setCurrentlyServing(serving.ticket_no)
         setWaitingCount(data.filter((r) => r.status === 'waiting').length)
      }
      void fetchState()
   }, [supabase])

   useEffect(() => {
      if (!ticket) return
      const channel = supabase
         .channel('customer-tracker')
         .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'queue' },
            (payload: RealtimePostgresChangesPayload<QueueRow>) => {
               if (!payload.new || !('status' in payload.new)) return
               const updated = payload.new
               if (updated.status === 'serving') {
                  setCurrentlyServing(updated.ticket_no)
                  if (updated.ticket_no < ticket.ticket_no) {
                  setPosition((prev) => Math.max(0, prev - 1))
                  }
               }
               if (updated.status === 'waiting') {
                  setWaitingCount((prev) => prev + 1)
               }
            }
         )
         .subscribe()
      return () => { void supabase.removeChannel(channel) }
   }, [supabase, ticket])

   const joinQueue = async () => {
      if (!service) { setError('Please select a service.'); return }
      setLoading(true)
      setError(null)
      try {
         const { data, error: insertError } = await supabase
         .from('queue')
         .insert({ service, status: 'waiting' })
         .select('ticket_no, service')
         .single()
         if (insertError) throw insertError

         const { count, error: countError } = await supabase
         .from('queue')
         .select('*', { count: 'exact', head: true })
         .eq('status', 'waiting')
         .lt('ticket_no', data.ticket_no)
         if (countError) throw countError

         setTicket({ ticket_no: data.ticket_no, service: data.service ?? service })
         setPosition((count ?? 0) + 1)
      } catch (err) {
         setError('Something went wrong. Please try again.')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   const queueStatus = waitingCount <= 3 ? 'Moving Fast' : waitingCount <= 8 ? 'Moderate' : 'Busy'

   if (!ticket) {
      return (
         <main>
         <JoinForm
            service={service}
            loading={loading}
            error={error}
            onServiceChange={setService}
            onSubmit={joinQueue}
         />
         </main>
      )
   }

   return (
      <div className="m-h-100vh bg-[var(--primary-background)] p-20">
         <main className="w-[90vw] mx-auto">
            <header className="flex justify-between items-start mb-12">
               <div>
                  <h1 className="text-5xl font-bold">Virtual Queue</h1>
                  <p className='text-base mt-4'>Reserve and track your spot in line, hassle-free.</p>
               </div>
               <LiveBadge />
            </header>

            <StatsRow
               peopleAhead={Math.max(0, position - 1)}
               estWaitMins={position * 3}
               queueStatus={queueStatus}
            />

            <div className="grid grid-cols-[1fr_340px] gap-10">
               <TicketCard
                  ticketNo={ticket.ticket_no}
                  service={ticket.service}
                  currentlyServing={currentlyServing}
                  position={position}
                  confirmed={confirmed}
                  onConfirm={() => setConfirmed(true)}
                  onLeave={() => { setTicket(null); setConfirmed(false); setService('') }}
               />
               <div className="flex flex-col gap-10">
                  <NewsFeed />
                  <FacilityHours />
                  <HelpCard />
               </div>
            </div>
         </main>
      </div>
   )
}