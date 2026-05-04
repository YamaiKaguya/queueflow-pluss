import { QueueRow, TicketStatus } from "../_hooks/useStaff"
import { Play, AlertTriangle } from "lucide-react"

type Props = {
    filteredServing: QueueRow[]
    filteredWaiting: QueueRow[]
    filteredHasNext: boolean
    actionLoading: string | null
    callNext: () => void
    updateStatus: (id: string, status: TicketStatus) => Promise<void>
    hasServing: boolean
}

export default function ServingPanel({
    filteredServing,
    filteredWaiting,
    filteredHasNext,
    actionLoading,
    callNext,
    updateStatus,
    hasServing,
}: Props) {
    const current = filteredServing[0]
    const nextUp = filteredWaiting[0]           // peek at who's next
    const isLoading = actionLoading !== null
    const isBlocked = !filteredHasNext || isLoading || hasServing

    return (
        <section className="w-full h-full space-y-6 col-span-2">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between">
                <div className="flex flex-col justify-between w-full gap-6">

                    {/* CURRENTLY SERVING */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            CURRENTLY SERVING
                        </h2>

                        <div className="flex items-end gap-4 mt-2">
                            <div className={`text-6xl font-extrabold tracking-tight ${
                                current?.priority ? "text-amber-500" : "text-blue-500"
                            }`}>
                                {current?.ticket_no ?? "—"}
                            </div>

                            {/* Priority badge on current */}
                            {current?.priority && (
                                <div className="mb-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                                    <AlertTriangle className="w-4 h-4" />
                                    Priority Patient
                                </div>
                            )}
                        </div>

                        {current && (
                            <p className="text-gray-500 text-sm mt-1">{current.name}</p>
                        )}
                    </div>

                    {/* NEXT UP PREVIEW */}
                    {nextUp && (
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                            nextUp.priority
                                ? "bg-amber-50 border border-amber-200"
                                : "bg-gray-50 border border-gray-100"
                        }`}>
                            <span className={`text-xs uppercase tracking-wider font-semibold ${
                                nextUp.priority ? "text-amber-500" : "text-gray-400"
                            }`}>
                                Next up
                            </span>
                            <span className={`font-bold ${
                                nextUp.priority ? "text-amber-600" : "text-gray-700"
                            }`}>
                                #{nextUp.ticket_no}
                            </span>
                            <span className="text-gray-500">{nextUp.name}</span>
                            {nextUp.priority && (
                                <span className="ml-auto flex items-center gap-1 text-amber-600 font-medium text-xs">
                                    <AlertTriangle className="w-3 h-3" />
                                    Priority
                                </span>
                            )}
                        </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center w-full">

                        {/* CALL NEXT */}
                        <button
                            onClick={callNext}
                            disabled={isBlocked}
                            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition
                                ${isBlocked
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : nextUp?.priority
                                        ? "bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
                                        : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                                }`}
                        >
                            <Play size={16} />
                            {hasServing
                                ? "PATIENT IN SERVICE"
                                : isLoading
                                    ? "Calling..."
                                    : filteredHasNext
                                        ? nextUp?.priority
                                            ? "CALL PRIORITY PATIENT"
                                            : "CALL NEXT PATIENT"
                                        : "NO MORE PATIENTS"}
                        </button>

                        {/* STATUS BUTTONS */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => current?.id && updateStatus(current.id, "done")}
                                disabled={isLoading || !current}
                                className="px-3 py-2 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 disabled:opacity-40 transition cursor-pointer"
                            >
                                Done
                            </button>
                            <button
                                onClick={() => current?.id && updateStatus(current.id, "skipped")}
                                disabled={isLoading || !current}
                                className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition cursor-pointer"
                            >
                                Skip
                            </button>
                            <button
                                onClick={() => current?.id && updateStatus(current.id, "no-show")}
                                disabled={isLoading || !current}
                                className="px-3 py-2 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 transition cursor-pointer"
                            >
                                No-show
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}