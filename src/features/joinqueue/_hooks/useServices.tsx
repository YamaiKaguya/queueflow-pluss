import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/src/lib/supabase/client'

export type ServiceUI = {
   id: string
   label: string
   average: number     
   open: boolean
   ahead: number         
}

export function useServices() {
   const supabase = useMemo(() => createClient(), [])

   const [servicesData, setServicesData] = useState<ServiceUI[] | null>(null)
   const [queueData, setQueueData] = useState<{ service: string }[] | null>(null)
   const [loadingServices, setLoadingServices] = useState(true)

   const fetchServices = async () => {
      const { data: services } = await supabase
         .from('services')
         .select('id, label, average, open')
         .order('label')

      const { data: queue } = await supabase
         .from('queue')
         .select('service')
         .in('status', ['waiting', 'serving'])

      return {
         services: services ?? [],
         queue: queue ?? [],
      }
   }

   useEffect(() => {
      let mounted = true

      const load = async () => {
         setLoadingServices(true)

         const { services, queue } = await fetchServices()

         if (!mounted) return

         setServicesData(services)
         setQueueData(queue)
         setLoadingServices(false)
      }

      void load()

      const channel = supabase
         .channel('services-live')
         .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => void load())
         .subscribe()

      return () => {
         mounted = false
         void supabase.removeChannel(channel)
      }
   }, [supabase])

   const services: ServiceUI[] = useMemo(() => {
      const aheadMap: Record<string, number> = {}
      for (const row of queueData ?? []) {
         if (row.service) aheadMap[row.service] = (aheadMap[row.service] ?? 0) + 1
      }

      return (servicesData ?? []).map(s => ({
         id: s.id,
         label: s.label,
         average: Number(s.average) || 0,
         open: s.open,
         ahead: aheadMap[s.id] ?? 0,
      }))
   }, [servicesData, queueData])

   return { services, loadingServices }
}