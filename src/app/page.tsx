import { 
   Hero, 
   WhatMakesIt, 
   HowItWorks, 
   FAQ, 
   CTABanner, 
   Footer, 
   Copyright,} from "@/src/app/root/_barrel/barrel";
import Header from "@/src/components/header/oooo"

export default function Home() {
   return (
      <>
         <Header />
         <Hero />
         <WhatMakesIt />
         <HowItWorks />
         <FAQ />
         <CTABanner />
         <Footer />
         <Copyright/>
      </>
   )
}