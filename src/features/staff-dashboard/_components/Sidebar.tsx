// Sidebar.tsx
import React from "react"
import { Activity, Heart, Smile, Stethoscope, Microscope, ReceiptText } from "lucide-react"

const SERVICE_ICONS: Record<string, React.ElementType> = {
    Billing: ReceiptText,
    Cardiology: Heart,
    Dental: Smile,
    General: Stethoscope,
    Laboratory: Microscope,
}

type ServiceRow = {
    id: string
    label: string
    open: boolean
    ahead: number
    average: number
}

const FallbackIcon = Activity

type Props = {
    services: ServiceRow[]
    selectedId: string | null
    onSelect: (id: string) => void
}

export default function Sidebar({ services, selectedId, onSelect }: Props) {
    return (
        <div className="w-72 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-base font-bold text-gray-500 uppercase tracking-widest mb-4">
                All Departments
            </p>

            <div className="flex flex-col gap-1">
                {services.map((svc) => {
                    const Icon = SERVICE_ICONS[svc.label] ?? FallbackIcon
                    const isActive = selectedId === svc.id

                    return (
                        <button
                            key={svc.id}
                            onClick={() => onSelect(svc.id)}
                            className={`
                                group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xl transition cursor-pointer
                                ${isActive
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                }
                            `}
                        >
                            <Icon
                                size={18}
                                className={`transition ${
                                    isActive
                                        ? "text-blue-600"
                                        : "text-gray-400 group-hover:text-gray-600"
                                }`}
                            />
                            <span className="flex-1 text-left">{svc.label}</span>

                            {!svc.open && (
                                <span className="text-xs text-gray-400 font-medium">
                                    Closed
                                </span>
                            )}

                            {isActive && svc.open && (
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}