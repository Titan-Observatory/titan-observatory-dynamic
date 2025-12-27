import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-transparent">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-3 pb-1 text-center sm:pt-4 sm:pb-2">
        <Link href="/" aria-label="Go to home">
          <Image
            src="/images/2.png"
            alt="Titan Astronomical Observatory logo"
            width={3711}
            height={1352}
            priority
            unoptimized
            className="h-auto w-full max-w-sm sm:max-w-md"
          />
        </Link>
      </div>
    </header>
  );
}
