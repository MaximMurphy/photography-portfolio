"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "./PortfolioContext";
import { getAllLocations } from "@/lib/locations";
import Link from "next/link";

export function LocationNavigation() {
  const { currentLocation, navigateToNextLocation, navigateToPrevLocation } =
    usePortfolio();
  const locations = getAllLocations();

  const currentIndex = locations.findIndex(
    (loc) => loc.slug === currentLocation.slug
  );
  const nextIndex = (currentIndex + 1) % locations.length;
  const nextLocation = locations[nextIndex];
  const prevIndex = currentIndex <= 0 ? locations.length - 1 : currentIndex - 1;
  const prevLocation = locations[prevIndex];

  return (
    <div className="px-2 lg:px-4 py-2 text-xl md:text-2xl font-base tracking-widest text-stone-800">
      <div className="pb-2 lg:pb-4 border-b border-stone-400">
        <div className="flex items-center justify-between">
          <h1>
            <Link href="/" className="">
              Home
            </Link>
          </h1>
          <div className="flex gap-1 items-center">
            <motion.div
              className="items-center hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={navigateToPrevLocation}
                className="transition-transform hover:-translate-y-[2px] mr-2"
                aria-label={`Navigate to ${prevLocation.name}`}
              >
                <ChevronUp className="w-6 h-6" strokeWidth={1} />
              </button>
            </motion.div>
            <motion.h1
              key={currentLocation.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <p>{currentLocation.name}</p>
            </motion.h1>
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={navigateToNextLocation}
                className="transition-transform hover:translate-y-[2px] ml-2"
                aria-label={`Navigate to ${nextLocation.name}`}
              >
                <ChevronDown className="w-6 h-6" strokeWidth={1} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
