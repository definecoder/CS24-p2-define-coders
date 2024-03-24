import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Welcome to EcoSync</h1>
      <Image src="/logo.png" alt="EcoSync" width={200} height={200} />
    </main>
  );
}
