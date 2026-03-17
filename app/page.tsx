import { Hero } from "@/components/Hero/hero";
import { Navbar } from "@/components/Navbar/navbar";
import WhatMakesIt from "@/components/Hero/whatmakesitwork";
import HowItWorks from "@/components/Hero/howitworks";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatMakesIt />
      <HowItWorks />
    </>
  )
}