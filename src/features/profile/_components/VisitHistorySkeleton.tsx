export function VisitHistorySkeleton() {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-9 py-9 border-b border-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-5 w-48 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        {[120, 100, 90, 80].map((w, i) => (
                            <th key={i} className="px-6 py-3 text-center">
                                <div
                                    className="h-3 bg-gray-200 rounded animate-pulse mx-auto"
                                    style={{ width: w }}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i} className="border-b border-gray-50">
                            <td className="px-6 py-4 text-center">
                                <div className="h-3.5 w-20 bg-gray-200 rounded animate-pulse mx-auto" />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="h-3.5 w-20 bg-gray-200 rounded animate-pulse mx-auto" />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse mx-auto" />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse mx-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-gray-100 text-center">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
        </div>
    )
}