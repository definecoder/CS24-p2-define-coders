import Hero from "@/components/Homepage/Hero";
import Navbar from "@/components/Homepage/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      
    </main>
  );
}
// /<Image src="/logo.png" alt="EcoSync" width={200} height={200} />