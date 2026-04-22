export function CurrentlyServingListSkeleton() {
   return (
      <div className="bg-white rounded-[20px] p-10 shadow-sm flex flex-col animate-pulse">
         
         {/* Title
         <div className="h-5 w-48 bg-gray-200 rounded mb-6" /> */}

         {/* Serving Section */}
         <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
               <div className="h-3 w-24 bg-gray-200 rounded" />
               <div className="h-3 w-6 bg-gray-200 rounded" />
            </div>

            <div className="space-y-3">
               {[...Array(2)].map((_, i) => (
                  <div
                     key={i}
                     className="flex items-center justify-between py-4 px-6 rounded-xl border border-gray-200"
                  >
                     <div className="h-4 w-56 bg-gray-200 rounded" />
                     <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
               ))}
            </div>
         </div>

         {/* Waiting Section */}
         {/* <div>
            <div className="flex items-center justify-between mb-3">
               <div className="h-3 w-24 bg-gray-200 rounded" />
               <div className="h-3 w-6 bg-gray-200 rounded" />
            </div>

            <div className="space-y-3">
               {[...Array(3)].map((_, i) => (
                  <div
                     key={i}
                     className="flex items-center justify-between py-4 px-6 rounded-xl border border-gray-200"
                  >
                     <div className="h-4 w-56 bg-gray-200 rounded" />
                     <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
               ))}
            </div>
         </div> */}

         {/* Pagination */}
         <div className="mx-auto mt-4 gap-2 flex">
            <div className="h-10 w-10 bg-gray-200 rounded-lg" />
            <div className="h-10 w-10 bg-gray-200 rounded-lg" />
         </div>

      </div>
   )
}