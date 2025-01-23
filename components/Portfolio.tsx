"use client";

import { PhotoCarousel } from "./PhotoCarousel";
import { LocationNavigation } from "./LocationNavigation";
import { PortfolioProvider } from "./PortfolioContext";
import type { PortfolioProps } from "@/types/portfolio";
import PhotoCarouselFooter from "./PhotoCarouselFooter";

export function Portfolio({ initialLocation }: PortfolioProps) {
  return (
    <PortfolioProvider initialLocation={initialLocation}>
      <div className="h-screen flex flex-col overflow-hidden">
        <LocationNavigation />
        <div className="flex-1 relative">
          <PhotoCarousel />
        </div>
        <PhotoCarouselFooter />
      </div>
    </PortfolioProvider>
  );
}
