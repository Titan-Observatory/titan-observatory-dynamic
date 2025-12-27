import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-transparent">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-6 text-center sm:py-8">
        <Link href="/" aria-label="Go to home">
          <Image
            src="/images/2.png"
            alt="Titan Astronomical Observatory logo"
            width={3711}
            height={1352}
            priority
            unoptimized
            className="h-auto w-full max-w-md sm:max-w-lg"
          />
        </Link>
      </div>
    </header>
  );
}
