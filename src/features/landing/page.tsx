"use client"

import { motion, useScroll } from "motion/react"

import { 
   Hero, 
   WhatMakesIt, 
   HowItWorks, 
   FAQ, 
   CTABanner, 
   Footer, 
   Copyright,} from "@/src/features/landing/_barrel/barrel";

   import { PublicHeader } from "@/src/components/header/public-header"
   

export default function Landing() {
   const { scrollYProgress } = useScroll()

   return (
      <>
         <motion.div
            id="scroll-indicator"
            style={{
               scaleX: scrollYProgress,
               position: "fixed",
               zIndex: 9999,
               top: 0,
               left: 0,
               right: 0,
               height: 6,
               originX: 0,
               backgroundColor: "var(--primary-color)",
            }}
         />

         <PublicHeader />
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