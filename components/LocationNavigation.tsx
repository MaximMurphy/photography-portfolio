"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "./PortfolioContext";
import { getAllLocations } from "@/lib/locations";
import Link from "next/link";

export function LocationNavigation() {
  const router = useRouter();
  const { currentLocation, currentPhotoIndex } = usePortfolio();
  const locations = getAllLocations();

  const navigateToNextLocation = () => {
    const currentIndex = locations.findIndex(
      (loc) => loc.slug === currentLocation.slug
    );
    const nextIndex = (currentIndex + 1) % locations.length;
    const nextLocation = locations[nextIndex];

    router.push(`/portfolio/${nextLocation.slug}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentSubLocation = currentLocation.photos[currentPhotoIndex].location;

  return (
    <div className="mt-8 px-8 pb-4 lg:pb-0 border-b border-stone-400 text-stone-800">
      <div className="flex items-center justify-between">
        <motion.h1
          key={currentLocation.name}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-4xl lg:text-5xl font-base tracking-wider"
        >
          {currentLocation.name}
        </motion.h1>
        {/* 
        {currentSubLocation && (
          <motion.p
            key={currentSubLocation}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-4xl lg:text-5xl font-base tracking-wider"
          >
            {currentSubLocation}
          </motion.p>
        )}
          */}
        <motion.h1
          key={"home"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Link
            href="/"
            className="text-4xl lg:text-5xl font-base tracking-wider"
          >
            Home
          </Link>
        </motion.h1>
      </div>
      <div className="flex items-end justify-between md:mb-8 mt-4">
        <button
          onClick={navigateToNextLocation}
          className="transition-transform hover:translate-y-1"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
