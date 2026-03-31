import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="hidden bg-transparent sm:block">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pt-4 pb-2 text-center sm:px-6 sm:pt-4 sm:pb-2">
        <Link href="/" aria-label="Go to home">
          <Image
            src="/images/2.webp"
            alt="Titan Astronomical Observatory logo"
            width={3711}
            height={1352}
            sizes="(min-width: 640px) 448px, 100vw"
            className="h-auto w-full max-w-md sm:max-w-md"
          />
        </Link>
      </div>
    </header>
  );
}
