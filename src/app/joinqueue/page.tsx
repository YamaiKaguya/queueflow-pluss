// app/customer/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'

const SERVICES = ['Billing', 'Support', 'New Account', 'Complaints']

type QueueTicket = {
    ticket_no: number
    service: string
    position: number
}

export default function CustomerPage() {
    const [service, setService] = useState('')
    const [ticket, setTicket] = useState<QueueTicket | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()

    const joinQueue = async () => {
        if (!service) {
        setError('Please select a service.')
        return
    }

    setLoading(true)
    setError(null)

    try {
      // 1. Insert new ticket
        const { data, error: insertError } = await supabase
        .from('queue')
        .insert({ service, status: 'waiting' })
        .select('ticket_no, service')
        .single()

        if (insertError) throw insertError

        // 2. Count how many are ahead of this ticket
        const { count, error: countError } = await supabase
            .from('queue')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'waiting')
            .lt('ticket_no', data.ticket_no)

        if (countError) throw countError

        setTicket({
            ticket_no: data.ticket_no,
            service: data.service,
            position: (count ?? 0) + 1, // +1 because position is 1-based
        })
        } catch (err) {
        setError('Something went wrong. Please try again.')
        console.error(err)
        } finally {
        setLoading(false)
        }
}

const resetForm = () => {
    setTicket(null)
    setService('')
}

  // ── After joining: show ticket info ──────────────────────────────
if (ticket) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm text-center space-y-4">
            <p className="text-sm text-gray-500 uppercase tracking-widest">Your Ticket</p>
            <h1 className="text-7xl font-bold text-blue-600">#{ticket.ticket_no}</h1>
            <p className="text-gray-600">Service: <span className="font-medium">{ticket.service}</span></p>

            <div className="bg-blue-50 rounded-xl py-4 px-6">
            <p className="text-sm text-gray-500">Position in queue</p>
            <p className="text-3xl font-semibold text-blue-700">{ticket.position}</p>
            <p className="text-xs text-gray-400 mt-1">
                {ticket.position === 1 ? "You're next!" : `${ticket.position - 1} person(s) ahead of you`}
            </p>
            </div>

            <p className="text-xs text-gray-400">Please wait for your number to be called.</p>

            <button
            onClick={resetForm}
            className="mt-2 text-sm text-blue-500 underline hover:text-blue-700"
            >
            Join again
            </button>
        </div>
        </main>
    )
}

  // ── Join form ─────────────────────────────────────────────────────
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm space-y-6">
            <div>
            <h1 className="text-2xl font-bold text-gray-800">Join the Queue</h1>
            <p className="text-sm text-gray-500 mt-1">Select a service to get your ticket.</p>
            </div>

            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Service</label>
            <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                <button
                    key={s}
                    onClick={() => setService(s)}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    service === s
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'
                    }`}
                >
                    {s}
                </button>
                ))}
            </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
            onClick={joinQueue}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
            >
            {loading ? 'Joining...' : 'Get Ticket'}
            </button>
        </div>
        </main>
    )
}
