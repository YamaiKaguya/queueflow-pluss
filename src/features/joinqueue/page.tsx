'use client'

import { useJoinQueue } from '@/src/features/joinqueue/_hooks/useJoinQueue'
import { useServices } from '@/src/features/joinqueue/_hooks/useServices'

import { ServiceCard } from '@/src/features/joinqueue/_components/Services'
import { DetailsPanel } from '@/src/features/joinqueue/_components/DetailedCard'
import { TicketConfirmed } from '@/src/features/joinqueue/_components/Ticket'

export default function JoinQueue() {
   const { service, setService, ticket, loading, error, name, setName, email, setEmail, priority, setPriority, joinQueue } = useJoinQueue()
   const { services, loadingServices } = useServices()

   const selectedService = services.find((s) => s.id === service)

   if (ticket) return <TicketConfirmed {...ticket}/>

   return (
      <div className="w-full h-auto bg-gray-50 py-12">
         <main className="w-[90vw] mx-auto space-y-8">

               <div className="flex items-center gap-3">
                  <input
                     placeholder="Search services..."
                     className="flex-1 px-5 py-3 text-base rounded-xl border border-gray-200 bg-white outline-none"
                  />
                  <button
                     className="
                     text-base
                     bg-white text-black px-5 py-3 border border-gray-200
                     rounded-xl cursor-pointer 
                     hover:bg-[var(--primary-color)] hover:text-white transition-all transition-duration-300
                     "
                  >
                     Search
                  </button>
               </div>

               <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-4">
                     <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Available Departments</h2>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                           {services.filter((s) => s.open).length} Active
                        </span>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                     {loadingServices
                        ? [...Array(6)].map((_, i) => (
                           <div key={i} className="h-33 bg-gray-200 rounded-2xl animate-pulse" />
                           ))
                        : services.map((s) => (
                           <ServiceCard
                              key={s.id}
                              service={s}
                              isSelected={service === s.id}
                              onSelect={setService}
                           />
                        ))
                     }
                     </div>
                  </div>

                  <DetailsPanel
                     selected={selectedService}
                     name={name}
                     onNameChange={setName}
                     email={email}
                     onEmailChange={setEmail}
                     priority={priority}
                     onPriorityChange={setPriority}
                     onJoin={() => joinQueue()}
                     loading={loading}
                     error={error}
                  />
               </div>
         </main>
      </div>
   )
}