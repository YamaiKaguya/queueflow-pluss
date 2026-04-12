import { ReactNode } from "react"

type StatCardProps = {
   icon: ReactNode
   label: string
   value: string
}

export function StatCard({ icon, label, value }: StatCardProps) {
   return (
      <div className="bg-white rounded-[14px] p-4 flex items-center gap-3 shadow-sm">
         <span>{icon}</span>
         <div>
            <p className="text-base tracking-wider font-semibold m-0">
               {label}
            </p>
            <p className="text-[13px] text-gray-500 mt-1">
               {value}
            </p>
         </div>
      </div>
   )
}