export function TicketCardSkeleton() {
    return (
        <div className="bg-white rounded-[20px] p-9 shadow-sm animate-pulse">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-48 bg-gray-200 rounded" />
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Ticket Number */}
            <div className="h-50 flex items-center justify-center rounded-[16px] bg-gray-200">
                <div className="h-12 w-48 bg-gray-300 rounded" />
            </div>

            {/* Progress */}
            <div className="mt-7">
                <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* Confirm Section */}
            <div className="mt-7 pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
                <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-3 w-64 bg-gray-200 rounded" />
                </div>

                <div className="flex gap-3 flex-shrink-0">
                <div className="h-10 w-32 bg-gray-200 rounded-lg" />
                <div className="h-10 w-24 bg-gray-200 rounded-lg" />
                </div>
            </div>

        </div>
    )
}