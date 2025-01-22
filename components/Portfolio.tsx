"use client";

import { Suspense } from "react";
import { PhotoCarousel } from "./PhotoCarousel";
import { LocationNavigation } from "./LocationNavigation";
import { PortfolioProvider } from "./PortfolioContext";
import type { Location } from "@/types/portfolio";
import PhotoCarouselFooter from "./PhotoCarouselFooter";
import { LoadingSpinner } from "./LoadingSpinner";

interface PortfolioProps {
  initialLocation: Location;
}

export function Portfolio({ initialLocation }: PortfolioProps) {
  return (
    <PortfolioProvider initialLocation={initialLocation}>
      <div className="h-screen flex flex-col overflow-hidden">
        <LocationNavigation />
        <div className="flex-1 relative">
          <Suspense fallback={<LoadingSpinner />}>
            <PhotoCarousel />
          </Suspense>
        </div>
        <PhotoCarouselFooter />
      </div>
    </PortfolioProvider>
  );
}
