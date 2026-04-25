import React from "react"
import { Clock, User } from "lucide-react"
import { QueueRow } from "../_hooks/useStaff"

type Props = {
    waiting: QueueRow[]
}

export default function WaitingQueue({ waiting }: Props) {
    return (
        <section className="space-y-5">

            {/* Header */}
            <div className="flex items-end justify-between px-1">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Waiting Queue
                    </h2>

                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>
                            {waiting.length} ticket{waiting.length !== 1 ? "s" : ""}
                        </span>

                        <span className="h-3 w-px bg-gray-200" />

                        <span>
                            {/* Avg wait can be added later */}
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <table className="w-full text-left">

                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-[11px] uppercase text-gray-500">Queue</th>
                            <th className="px-6 py-4 text-[11px] uppercase text-gray-500">Name</th>
                            <th className="px-6 py-4 text-[11px] uppercase text-gray-500">Type</th>
                            <th className="px-6 py-4 text-[11px] uppercase text-gray-500">Time</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {waiting.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-16 text-center text-sm text-gray-400"
                                >
                                    No tickets
                                </td>
                            </tr>
                        ) : (
                            waiting.map((ticket) => {
                                return (
                                    <tr key={ticket.id} className="hover:bg-gray-50">

                                        {/* Queue number */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {ticket.ticket_no}
                                        </td>

                                        {/* Name */}
                                        <td className="px-6 py-4 text-gray-900">
                                            {ticket.name}
                                        </td>

                                        {/* Type */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {ticket.type}
                                            </div>
                                        </td>

                                        {/* Created time */}
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(ticket.created_at).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>

                                    </tr>
                                )
                            })
                        )}

                    </tbody>

                </table>
            </div>
        </section>
    )
}