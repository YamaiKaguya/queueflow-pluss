export function PatientProfileSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-9">
            {/* HEADER */}
            <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2.5">
                        <div className="h-7 w-44 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-5 w-28 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="h-3.5 w-56 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse ml-auto shrink-0" />
            </div>

            {/* SUB LABEL */}
            <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse shrink-0" />
                            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}