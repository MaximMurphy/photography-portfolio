"use client";

import { PhotoCarousel } from "./PhotoCarousel";
import { CityNavigation } from "./CityNavigation";
import { PortfolioProvider } from "./PortfolioContext";

export function Portfolio() {
  return (
    <PortfolioProvider>
      <div>
        <CityNavigation />
        <PhotoCarousel />
      </div>
    </PortfolioProvider>
  );
}
