import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

const Stats = dynamic(() => import("@/components/Stats"));
const About = dynamic(() => import("@/components/About"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <About />
      <FAQ />
      <Contact />
    </>
  );
}
