"use client";

import { PhotoCarousel } from "./PhotoCarousel";
import { LocationNavigation } from "./LocationNavigation";
import { PortfolioProvider } from "./PortfolioContext";
import type { Location } from "@/types/portfolio";

interface PortfolioProps {
  initialLocation: Location;
}

export function Portfolio({ initialLocation }: PortfolioProps) {
  return (
    <PortfolioProvider initialLocation={initialLocation}>
      <div>
        <LocationNavigation />
        <PhotoCarousel />
      </div>
    </PortfolioProvider>
  );
}
