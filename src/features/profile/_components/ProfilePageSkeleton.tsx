import { PatientProfileSkeleton } from "./PatientProfileSkeleton"
import { VisitHistorySkeleton } from "./VisitHistorySkeleton"


export default function ProfilePageSkeleton() {
    return (
        <div className="min-h-screen bg-[#F5F5F3] px-8 py-14.5">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <div className="h-9 w-40 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-72 bg-gray-200 rounded-lg animate-pulse mt-2" />
                </div>
                <PatientProfileSkeleton />
                <VisitHistorySkeleton />
            </div>
        </div>
    )
}