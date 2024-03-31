import Hero from "@/components/Homepage/Hero";
import Navbar from "@/components/Homepage/Navbar";
import Image from "next/image";
import SectionTitle from "@/components/Homepage/SectionTitle";import Benifit from "@/components/Homepage/Benifit";
import Deliverable from "@/components/Homepage/Deliverables";
import Teamintro from "@/components/Homepage/Teamintro";
;

export default function Home() {
  return (
    <main className="bg-[#EEF7FC]">
      <Navbar/>
      <Hero />
      <SectionTitle
        pretitle="EcoSync Benefits"
        title=" Why should you use this EcoSync Software">
        Our dashboard empowers Dhaka South City Corporation to allocate resources more effectively, 
        optimizing manpower and equipment utilization for waste management tasks, thus fostering operational efficiency, reducing operational costs, 
        and ultimately leading to a cleaner, more sustainable urban environment.
      </SectionTitle>
      <Benifit/>
      <Deliverable/>
      <Teamintro/>
      
    </main>
  );
}
// /<Image src="/logo.png" alt="EcoSync" width={200} height={200} />