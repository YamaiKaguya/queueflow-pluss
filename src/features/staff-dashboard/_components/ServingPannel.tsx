import { QueueRow, TicketStatus } from "../_hooks/useStaff"
import TicketCard from "./TicketCard"

type Props = {
    filteredServing: QueueRow[]
    filteredWaiting: QueueRow[]
    filteredHasNext: boolean
    actionLoading: string | null
    callNext: () => void
    updateStatus: (id: string, status: TicketStatus) => Promise<void>
}

export default function ServingPanel({
    filteredServing,
    filteredWaiting,
    filteredHasNext,
    actionLoading,
    callNext,
    updateStatus,
}: Props) {
    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-bold uppercase tracking-widest">
                    Currently Serving
                    {filteredServing.length !== 1 ? "s" : ""}
                </p>

                <button
                    onClick={callNext}
                    disabled={!filteredHasNext || actionLoading !== null}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold px-5 py-4 rounded-lg transition"
                >
                    {actionLoading
                        ? "Calling..."
                        : `Call Next ${filteredHasNext ? `(#${filteredWaiting[0].ticket_no})` : ""}`}
                </button>
            </div>

            <section>
                {filteredServing.length === 0 ? (
                    <p className="border border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400">
                        No one is being served right now.
                    </p>
                ) : (
                    <div className="flex flex-col gap-2">
                        {filteredServing.map((ticket) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                actionLoading={actionLoading}
                                onDone={() => updateStatus(ticket.id, "done")}
                                onSkip={() => updateStatus(ticket.id, "skipped")}
                                onNoShow={() => updateStatus(ticket.id, "no-show")}
                            />
                        ))}
                    </div>
                )}
            </section>

        </div>
    )
}