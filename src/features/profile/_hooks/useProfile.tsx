import { createClient } from '@/src/lib/supabase/client'
import { useCallback, useMemo, useState } from 'react'

import type { Database } from '@/src/types/supabase'
type Profile = Database['public']['Tables']['profiles']['Row']

export function useProfile() {
    const supabase = useMemo(() => createClient(), [])

    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const retrieveData = useCallback(async () => {
        setLoading(true)
        setError(null)

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setLoading(false)
            return
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error) {
            console.error('Failed to retrieve data:', error.message)
            setError(error.message)
            setLoading(false)
            return
        }

        setProfile(data)
        setLoading(false)
    }, [supabase])

    return {
        profile,
        loading,
        error,
        retrieveData,
    }
}