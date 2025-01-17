"'use client'";

import { PhotoCarousel } from "./PhotoCarousel";
import { CityNavigation } from "./CityNavigation";
import { PortfolioProvider } from "./PortfolioContext";

export function Portfolio() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <CityNavigation />
        <PhotoCarousel />
      </div>
    </PortfolioProvider>
  );
}
