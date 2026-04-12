import { useRouter } from 'next/navigation'

export function NoTicket() {
   const router = useRouter()

   return (
      <div className="min-h-[calc(100vh-74px)]  bg-[var(--primary-background)] flex items-center justify-center p-6">
         <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md w-full">
         <p className="text-xl text-gray-500">You have no active ticket.</p>
         <button
            onClick={() => router.push('/joinqueue')}
            className="px-6 py-3 bg-[var(--primary-color-dark)] text-white rounded-lg font-medium hover:opacity-90 transition"
         >
            Join the Queue
         </button>
         </div>
      </div>
   )
}