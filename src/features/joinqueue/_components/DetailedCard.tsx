type Service = { 
   label: string
   open: boolean
   ahead: number
   average: number
}

type Props = {
   selected: Service | undefined
   name: string
   onNameChange: (v: string) => void
   email: string
   onEmailChange: (v: string) => void
   priority: boolean
   onPriorityChange: (v: boolean) => void
   onJoin: () => void
   loading: boolean
   error: string | null
}

export function DetailsPanel({ selected, name, onNameChange, email, onEmailChange, priority, onPriorityChange, onJoin, loading, error }: Props) {
   if (!selected) {
      return (
         <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">Select a department to view details</p>
         </div>
      )
   }

  const eta = selected.ahead * selected.average

return (
   <form
      onSubmit={(e) => {
         e.preventDefault()

         if (!name.trim() || !email.trim()) {
            return
         }

         onJoin()
      }}
      className="bg-white rounded-2xl p-6 shadow-sm space-y-5 flex flex-col"
   >
      {/* HEADER */}
      <div>
         <h3 className="text-xl font-semibold text-gray-800">
            {selected.label}
         </h3>
         <p className="text-xs text-gray-500">
            Department Live Overview
         </p>
      </div>

      {/* STATUS */}
      <div className="grid grid-cols-3 gap-3 text-center">
         <div className="bg-gray-100 rounded-xl py-3">
            <p className="text-xs text-gray-500">Queue</p>
            <p className="font-semibold">{selected.ahead}</p>
         </div>
         <div className="bg-blue-50 rounded-xl py-3">
            <p className="text-xs text-gray-500">ETA</p>
            <p className="font-semibold text-blue-600">{eta} min</p>
         </div>
         <div className="bg-gray-100 rounded-xl py-3">
            <p className="text-xs text-gray-500">Avg</p>
            <p className="font-semibold">{selected.average} min</p>
         </div>
      </div>

      {/* INPUT */}
      <div className="space-y-3">
         <input
            type="text"
            placeholder="Nickname"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-1 focus:ring-blue-300 focus:outline-none"
         />

         <input
            type="email"
            placeholder="Email Address"
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-1 focus:ring-blue-300 focus:outline-none"
         />
      </div>

      {/* PRIORITY */}
      <div className="flex items-start gap-3">
         <input
            id="priority"
            type="checkbox"
            checked={priority}
            onChange={(e) => onPriorityChange(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 cursor-pointer"
         />
         <div className="flex flex-col">
            <label
               htmlFor="priority"
               className="text-sm font-medium text-gray-700 cursor-pointer"
            >
               Request Priority
            </label>
            <span className="text-xs text-gray-500">
               For elderly, pregnant, or persons with disabilities
            </span>
         </div>
      </div>

      {/* ACTION */}
      <div className="mt-auto space-y-3">
         {error && (
            <p className="text-sm text-red-500">
               {error}
            </p>
         )}

         <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-40 cursor-pointer"
         >
            {loading ? 'Joining...' : 'Join Queue'}
         </button>
      </div>
   </form>
   )
}