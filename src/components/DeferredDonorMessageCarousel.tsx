"use client";

import dynamic from "next/dynamic";

const DonorMessageCarousel = dynamic(
  () => import("@/components/DonorMessageCarousel"),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="min-h-[9rem]" />,
  },
);

export default function DeferredDonorMessageCarousel() {
  return <DonorMessageCarousel />;
}
