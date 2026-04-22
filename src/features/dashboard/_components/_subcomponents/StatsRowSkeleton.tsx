export function StatsRowSkeleton() {
    return (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div
                key={i}
                className="p-5 bg-white rounded-2xl border animate-pulse"
                >
                <div className="flex items-center gap-4">
                    
                    {/* Icon placeholder */}
                    <div className="w-10 h-10 bg-gray-200 rounded-lg" />

                    {/* Text */}
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>

                </div>
                </div>
            ))}
        </div>
    )
}