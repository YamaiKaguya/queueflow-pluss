export function StatsRowSkeleton() {
    return (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-20 rounded-lg animate-pulse">
                </div>
            ))}
        </div>
    )
}
