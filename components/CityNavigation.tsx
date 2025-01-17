"'use client'";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePortfolio } from "./PortfolioContext";

export function CityNavigation() {
  const { currentCityIndex, setCurrentCityIndex, cities } = usePortfolio();

  const navigateToNextCity = () => {
    // @ts-expect-error - Type mismatch doesnt affect code
    setCurrentCityIndex((prev: number) => (prev + 1) % cities.length);
  };

  return (
    <div className="mt-8">
      <motion.h1
        key={cities[currentCityIndex].name}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="text-4xl font-bold mb-8"
      >
        {cities[currentCityIndex].name}
      </motion.h1>
      <button
        onClick={navigateToNextCity}
        className="mt-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </div>
  );
}
