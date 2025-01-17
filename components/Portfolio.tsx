"use client";

import { PhotoCarousel } from "./PhotoCarousel";
import { CityNavigation } from "./CityNavigation";
import { PortfolioProvider } from "./PortfolioContext";

export function Portfolio() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen p-4">
        <CityNavigation />
        <PhotoCarousel />
      </div>
    </PortfolioProvider>
  );
}
