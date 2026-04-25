import { QueueRow } from "../_hooks/useStaff"

type Props = {
    ticket: QueueRow
    actionLoading: string | null
    onDone: () => void
    onSkip: () => void
    onNoShow: () => void
}

export default function TicketCard({
    ticket,
    actionLoading,
    onDone,
    onSkip,
    onNoShow,
}: Props) {
    const isLoading = actionLoading === ticket.id

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-4">

                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-900 font-semibold">
                    {ticket.ticket_no}
                </div>

                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                        NAME
                    </span>
                    <span className="text-base font-semibold text-gray-900">
                        Frewen
                    </span>
                </div>

            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

                <button
                    onClick={onDone}
                    disabled={isLoading}
                    className="px-3 py-1.5 rounded-lg text-sm text-white bg-green-500 hover:bg-green-600 disabled:opacity-40"
                >
                    Done
                </button>

                <button
                    onClick={onSkip}
                    disabled={isLoading}
                    className="px-3 py-1.5 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                >
                    Skip
                </button>

                <button
                    onClick={onNoShow}
                    disabled={isLoading}
                    className="px-3 py-1.5 rounded-lg text-sm text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40"
                >
                    No-show
                </button>

            </div>
        </div>
    )
}