import hospital from "../../public/hospital.jpg";
import Image from "next/image";


export  function Hero() {
   return (
   <section className="grid grid-cols-2 gap-24 place-items-center min-h-[calc(100vh-100px)] px-35" 
   // !GAP AND PX
      // style={{ backgroundColor: "pink" }}
   >
      <div className="my-auto"
      // style={{ backgroundColor: "red" }}
      >
         <p className="text-sm bg-gray-100 inline-block px-3 py-1 rounded-full">
            The Next Gen of Queue Management
         </p>

         <h1 className="text-5xl font-bold mt-6">
            Reimagining the <span className="text-blue-500">Wait Experience</span>
         </h1>

         <p className="text-gray-600 mt-4">
            QueueFlow+ eliminates physical lines and transforms waiting into a digital experience.
         </p>

         <div className="flex gap-4 mt-8">
               <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                     Start Queueing
               </button>

               <button className="border px-6 py-3 rounded-lg">
                     Button
               </button>
         </div>
      </div>

      <div>
      <Image
         src={hospital}
         alt="Hospital Waiting Room"
         className="max-w-xs md:max-w-lg rounded-2xl shadow-xl p-1"
         // style={{ backgroundColor: "red" }}
      />
      </div>
   </section>
   )
}