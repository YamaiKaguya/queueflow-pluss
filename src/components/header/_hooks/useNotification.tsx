'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type Notification = {
  id: string
  message: string
  read: boolean
  created_at: string
}

const PAGE_SIZE = 10

export function useNotifications() {
  const supabase = useMemo(() => createClient(), [])
  const [notifs, setNotifs] = useState<Notification[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  // Use a ref so loadMore always sees the latest value without re-subscribing
  const offsetRef = useRef(0)

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUserId(data.user?.id ?? null)
    }
    getUser()
  }, [supabase])

  // FETCH PAGE — reusable helper
  const fetchPage = async (offset: number): Promise<Notification[]> => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId!)
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1)

    if (error || !data) return []
    return data as Notification[]
  }

  // INITIAL FETCH + REALTIME
  useEffect(() => {
    if (!userId) return
    let cancelled = false

    const init = async () => {
      setLoading(true)
      const data = await fetchPage(0)
      if (!cancelled) {
        setNotifs(data)
        offsetRef.current = data.length
        setHasMore(data.length === PAGE_SIZE)
        setLoading(false)
      }
    }

    init()

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<Notification>) => {
          // Prepend the new notif and bump the offset so pagination stays correct
          setNotifs((prev) => [payload.new as Notification, ...prev])
          offsetRef.current += 1
        }
      )
      .subscribe((status) => {
        console.log('Realtime status:', status, '| userId:', userId)
      })

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  // LOAD MORE (called by scroll sentinel)
  const loadMore = async () => {
    if (!userId || loadingMore || !hasMore) return
    setLoadingMore(true)
    const data = await fetchPage(offsetRef.current)
    setNotifs((prev) => {
      // Deduplicate by id in case a realtime event already added one
      const existingIds = new Set(prev.map((n) => n.id))
      const fresh = data.filter((n) => !existingIds.has(n.id))
      return [...prev, ...fresh]
    })
    offsetRef.current += data.length
    setHasMore(data.length === PAGE_SIZE)
    setLoadingMore(false)
  }

  // MARK ONE
  const markOneRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  // MARK ALL
  const markAllRead = async () => {
    if (!userId) return
    await supabase.from('notifications').update({ read: true }).eq('user_id', userId)
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return { notifs, loading, loadingMore, hasMore, loadMore, markOneRead, markAllRead }
}