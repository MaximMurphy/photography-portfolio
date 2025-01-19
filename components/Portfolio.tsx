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
      <div className="h-screen flex flex-col overflow-hidden">
        <LocationNavigation />
        <div className="flex-1 relative">
          <PhotoCarousel />
        </div>
      </div>
    </PortfolioProvider>
  );
}
