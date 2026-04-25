'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export type TicketStatus =
    | 'waiting'
    | 'serving'
    | 'done'
    | 'skipped'
    | 'no-show'

export type QueueRow = {
    id: string
    ticket_no: number
    service: string | null
    status: TicketStatus
    created_at: string
    called_at: string | null
    served_at: string | null
    type: ["Online", "WalkIn"] 
    name: string
}

export type ServiceRow = {
    id: string
    label: string
    open: boolean
    ahead: number
    average: number
}

export function useStaffQueue() {
    const supabase = createClient()

    const [queue, setQueue] = useState<QueueRow[]>([])
    const [services, setServices] = useState<ServiceRow[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    // ── FETCH QUEUE ─────────────────────────────
    useEffect(() => {
        const fetchQueue = async () => {
            const { data, error } = await supabase
                .from('queue')
                .select('*')
                .not('status', 'in', '("done","skipped","no-show")')
                .order('ticket_no', { ascending: true })

            if (error) return console.error(error)

            setQueue(data ?? [])
            setLoading(false)
        }

        fetchQueue()
    }, [])

    // ── FETCH SERVICES ──────────────────────────
    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('label', { ascending: true })

            if (error) return console.error(error)

            setServices(data ?? [])
        }

        fetchServices()
    }, [])

    // ── REALTIME ────────────────────────────────
    useEffect(() => {
        const channel = supabase
            .channel(`staff-${crypto.randomUUID()}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'queue' },
                (payload: RealtimePostgresChangesPayload<QueueRow>) => {
                    const updated = payload.new as QueueRow
                    if (!updated) return

                    // completed tickets
                    if (
                        updated.status === 'done' ||
                        updated.status === 'skipped' ||
                        updated.status === 'no-show'
                    ) {
                        setQueue(prev =>
                            prev.map(t =>
                                t.id === updated.id ? { ...t, ...updated } : t
                            )
                        )

                        setTimeout(() => {
                            setQueue(prev =>
                                prev.filter(t => t.id !== updated.id)
                            )
                        }, 1500)

                        return
                    }

                    // insert / update
                    setQueue(prev => {
                        const exists = prev.find(t => t.id === updated.id)

                        if (exists) {
                            return prev.map(t =>
                                t.id === updated.id ? { ...t, ...updated } : t
                            )
                        }

                        return [...prev, updated].sort(
                            (a, b) => a.ticket_no - b.ticket_no
                        )
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // ── ACTIONS ────────────────────────────────
    const callNext = useCallback(async () => {
        const next = queue.find(t => t.status === 'waiting')
        if (!next) return

        setActionLoading(next.id)

        const { error } = await supabase
            .from('queue')
            .update({
                status: 'serving',
                called_at: new Date().toISOString(),
            })
            .eq('id', next.id)

        if (error) console.error(error)

        setActionLoading(null)
    }, [queue])

    const updateStatus = useCallback(
        async (id: string, status: TicketStatus) => {
            setActionLoading(id)

            const updates: Partial<QueueRow> = { status }

            if (status === 'done') {
                updates.served_at = new Date().toISOString()
            }

            const { error } = await supabase
                .from('queue')
                .update(updates)
                .eq('id', id)

            if (error) console.error(error)

            setActionLoading(null)
        },
        []
    )

    // ── DERIVED STATE ──────────────────────────
    const serving = useMemo(
        () => queue.filter(t => t.status === 'serving'),
        [queue]
    )

    const waiting = useMemo(
        () => queue.filter(t => t.status === 'waiting'),
        [queue]
    )

    return {
        queue,
        services,
        loading,
        actionLoading,
        serving,
        waiting,
        hasNext: waiting.length > 0,
        callNext,
        updateStatus,
    }
}