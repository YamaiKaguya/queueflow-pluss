'use client';

import { useRouter } from "next/navigation";

type Props = { 
   ticket_no: number; 
   service: string; 
   position: number; 
}

export function TicketConfirmed({ ticket_no, service, position }: Props) {
   const router = useRouter();

   return (
      <main className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="bg-white rounded-2xl shadow-lg p-14 w-full max-w-lg space-y-8 text-center">
               <h1 className="text-3xl font-bold text-gray-800">Your Ticket</h1>
               <div className="bg-blue-50 rounded-2xl p-10 space-y-4">
                  <p className="text-7xl font-black text-blue-600">#{ticket_no}</p>
                  <p className="text-lg font-medium text-gray-600">{service}</p>
                  <p className="text-sm text-gray-500">
                        Queue position: <span className="font-semibold">{position}</span>
                  </p>
               </div>
               <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all cursor-pointer"
               >
                  Go to Dashboard
               </button>
            </div>
      </main>
   );
}