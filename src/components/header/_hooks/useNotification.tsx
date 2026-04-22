'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type Notification = {
    id: string
    message: string
    read: boolean
    created_at: string
}

export function useNotifications() {
    const supabase = useMemo(() => createClient(), [])
    const [notifs, setNotifs] = useState<Notification[]>([])
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // GET USER
    useEffect(() => {
        const getUser = async () => {
        const { data } = await supabase.auth.getUser()
        setUserId(data.user?.id ?? null)
        }
        getUser()
    }, [supabase])

    // GET INITIAL NOTIFICATIONS
    useEffect(() => {
        console.log('Observer effect ran, userId:', userId)
        if (!userId) return

        const channel = supabase
            .channel(`notifications:${userId}`)
            .on('postgres_changes', { 
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userId}`,
            }, 
            (payload: RealtimePostgresChangesPayload<Notification>) => {
            console.log('Realtime event received:', payload)
            setNotifs((prev) => [payload.new as Notification, ...prev])
            })
            .subscribe((status: string) => {
            console.log('Realtime status:', status, '| userId:', userId)
            })

        return () => {
            console.log('Cleaning up channel')
            supabase.removeChannel(channel)
        }
    }, [userId, supabase])

  // OBSERVER
    useEffect(() => {
        if (!userId) return
        const channel = supabase
        .channel('notifications')
        .on(
            'postgres_changes',
            {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userId}`,
            },
            (payload: RealtimePostgresChangesPayload<Notification>) => {
            setNotifs((prev) => [payload.new as Notification, ...prev])
            }
        )
        .subscribe()
                console.log('Realtime status:', status) // should log "SUBSCRIBED"


        return () => {
        supabase.removeChannel(channel)
        }
    }, [userId, supabase])

    // MARK ONE
    const markOneRead = async (id: string) => {
        await supabase.from('notifications').update({ read: true }).eq('id', id)
        setNotifs((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
    }

    // MARK ALL
    const markAllRead = async () => {
        if (!userId) return
        await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
    }

    return { notifs, loading, markOneRead, markAllRead }
}