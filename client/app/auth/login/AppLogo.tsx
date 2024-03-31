import Image from "next/image";
import Link from "next/link";

export default function AppLogo() {
  return (
    <div className="w-full">
        <Link href="/" className="hover:cursor-pointer">
        <Image
          src="/logoBlack.png"
          alt="Image"
          width="500"
          height="500"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </Link>
      </div>
  )
}