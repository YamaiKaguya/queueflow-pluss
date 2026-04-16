import { div } from "framer-motion/client"

type Props = {
   ticketNo: number
   service: string
   currentlyServing: number | null
   confirmed: boolean
   onConfirm: () => void
   onLeave: () => void
}

export function TicketCard({ticketNo, service, currentlyServing, confirmed, onConfirm, onLeave }: Props) {
   const prefix = service.charAt(0).toUpperCase()

   const formatted = (n: number) => `${prefix} – ${String(n).padStart(3, '0')}`
   const progressPct = currentlyServing
      ? Math.min(100, Math.round((currentlyServing / ticketNo) * 100))
      : 0

   return (

      <div className="bg-white rounded-[20px] p-9 shadow-sm">
         <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-bold text-slate-600 tracking-wide mb-2 ">
               YOUR QUEUE NUMBER
            </p>
            <div className="relative">
               <span
               className={`inline-block w-2 h-2 rounded-full ${
               ticketNo !== 0 ? 'bg-green-500' : 'bg-red-500'
               } mr-1 absolute top-1.5 left-[-12px]`}
            />
            <p className="text-sm font-semibold text-slate-700 mb-2">
               {ticketNo !== 0 ? "Active" : "Inactive"}
            </p>
            </div>
         </div>
         <div className="h-50 flex items-center justify-around rounded-[16px] bg-blue-500 from-indigo-400 via-blue-400 to-sky-300 opacity-80">
            <p className="text-7xl font-extrabold text-white -tracking-[1px] m-0">
               {formatted(ticketNo)}
            </p>
         </div>

         {/* PROGRESS BAR */}
         <div className="mt-7">
            <p className="text-sm font-semibold text-slate-700 mb-2">
               Estimated Arrival
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
               <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-600 ease-in-out"
                  style={{ width: `${progressPct}%` }}
               />
            </div>
         </div>

         {/* Confirm row */}
         <div className="mt-7 pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
            <div>
               <p className="text-base font-bold text-slate-900 mb-1">
                  {confirmed ? '✓ Arrival Confirmed' : 'Next Step: Confirm Arrival'}
               </p>
               <p className="text-sm text-slate-400">
                  {confirmed
                  ? 'You are confirmed. Please wait to be called.'
                  : 'Please tap the button when you are within facility.'}
               </p>
            </div>

            <div className="flex gap-3 flex-shrink-0">
               {!confirmed && (
                  <button
                  onClick={onConfirm}
                  className="text-base font-semibold bg-blue-500 text-white rounded-lg py-2.5 px-5 cursor-pointer"
                  >
                  Confirm Arrival
                  </button>
               )}

               <button
                  onClick={onLeave}
                  className="text-base font-medium bg-none text-red-500 border-none cursor-pointer"
               >
                  {confirmed ? 'Leave Queue' : 'Leave Queue'}
               </button>
            </div>
         </div>
      </div>
   )
}