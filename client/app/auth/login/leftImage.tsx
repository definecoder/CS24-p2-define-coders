import Image from "next/image";

export default function LeftImage() {
  return (
    <div className="hidden bg-muted lg:block">
        <Image
          src="/ecoSyncBg.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
  )
}