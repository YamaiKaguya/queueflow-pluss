const SERVICES = ['Billing', 'Support', 'New Account', 'Complaints']

export function JoinForm({ service, loading, error, onServiceChange, onSubmit }: {
   service: string
   loading: boolean
   error: string | null
   onServiceChange: (s: string) => void
   onSubmit: () => void
}) {
   return (
      <div className="max-w-[480px] mx-auto mt-20 bg-white rounded-[20px] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
         {/* Header */}
         <div className="mb-7">
         <h1 className="text-[28px] font-bold text-slate-900 m-0">Virtual Queue</h1>
         <p className="text-[14px] text-slate-400 mt-1">Reserve and track your spot in line, hassle-free.</p>
         </div>

         {/* Service Label */}
         <p className="text-[13px] font-semibold text-slate-600 mb-3 uppercase tracking-wide">Select a Service</p>

         {/* Service Buttons */}
         <div className="grid grid-cols-2 gap-2.5 mb-6">
         {SERVICES.map((s) => (
            <button
               key={s}
               onClick={() => onServiceChange(s)}
               className={`py-3.5 px-4 rounded-[12px] border-[1.5px] text-[14px] font-medium cursor-pointer 
               ${service === s ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-700 border-gray-200'}`}
            >
               {s}
            </button>
         ))}
         </div>

         {/* Error */}
         {error && <p className="text-red-500 text-[13px] mb-3">{error}</p>}

         {/* Submit */}
         <button
         onClick={onSubmit}
         disabled={loading}
         className="w-full bg-blue-500 text-white rounded-[12px] py-3.5 text-[15px] font-semibold cursor-pointer disabled:opacity-60"
         >
         {loading ? 'Joining...' : 'Get My Ticket'}
         </button>
      </div>
   )
}