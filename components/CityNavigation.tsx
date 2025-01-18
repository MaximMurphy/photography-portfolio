"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePortfolio } from "./PortfolioContext";

export function CityNavigation() {
  const {
    currentCityIndex,
    setCurrentPhotoIndex,
    setCurrentCityIndex,
    cities,
  } = usePortfolio();

  const navigateToNextCity = () => {
    setCurrentPhotoIndex(0);
    // @ts-expect-error - Type mismatch doesnt affect code
    setCurrentCityIndex((prev: number) => (prev + 1) % cities.length);
  };

  return (
    <div className="mt-8 px-8 pb-4 lg:pb-0 border-b border-stone-300">
      <motion.h1
        key={cities[currentCityIndex].name}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="text-4xl lg:text-5xl font-base tracking-wider"
      >
        {cities[currentCityIndex].name}
      </motion.h1>
      <button onClick={navigateToNextCity} className="">
        <ChevronDown className="w-8 h-8 md:mb-8 mt-4" />
      </button>
    </div>
  );
}
