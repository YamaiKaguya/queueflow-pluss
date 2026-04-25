import React from "react"
import { Stethoscope } from "lucide-react"

type Props = {
    selectedService: any
    SERVICE_ICONS: Record<string, React.ElementType>
    FallbackIcon: React.ElementType
}

export default function ServiceHeader({
    selectedService,
    SERVICE_ICONS,
    FallbackIcon,
}: Props) {
    const Icon = selectedService
        ? SERVICE_ICONS[selectedService.label] ?? FallbackIcon
        : Stethoscope

    return (
        <header className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-50 flex items-center justify-center p-4">
                    <Icon strokeWidth={1.5} size={38} className="text-blue-600" />
                </div>

                <div className="grid">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
                        {selectedService
                            ? selectedService.label.toUpperCase()
                            : "ALL DEPARTMENTS"}
                    </h1>

                    <div className="flex items-center gap-2 mt-1">
                        {selectedService ? (
                            selectedService.open ? (
                                <p className="inline-flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                    Active
                                </p>
                            ) : (
                                <p className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                    Closed
                                </p>
                            )
                        ) : (
                            <p className="inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                                All Services
                            </p>
                        )}

                        {selectedService && (
                            <p className="text-sm text-gray-400">
                                ~{selectedService.average} min avg · {selectedService.ahead} ahead
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}