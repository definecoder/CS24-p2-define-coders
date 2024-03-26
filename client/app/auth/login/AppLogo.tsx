import Image from "next/image";

export default function AppLogo() {
  return (
    <div className="w-full">
        <Image
          src="/logoBlack.png"
          alt="Image"
          width="500"
          height="500"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
  )
}