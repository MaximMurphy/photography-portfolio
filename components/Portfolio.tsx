"use client";

import { useEffect, useState } from "react";
import { PhotoCarousel } from "./PhotoCarousel";
import { LocationNavigation } from "./LocationNavigation";
import { PortfolioProvider } from "./PortfolioContext";
import type { PortfolioProps } from "@/types/portfolio";
import PhotoCarouselFooter from "./PhotoCarouselFooter";
import PixelatedLoader from "./PixelatedLoader";

export function Portfolio({ initialLocation }: PortfolioProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simple loading of all thumbnails at once
  useEffect(() => {
    // Reset loading state when location changes
    setIsLoading(true);

    // Array to hold all thumbnail promises
    const thumbnailPromises = [];

    // Create all thumbnail promises
    for (let i = 0; i < initialLocation.photoCount; i++) {
      const adjustedIndex = i + 1;
      const thumbnailSrc = `/photos/${initialLocation.slug}/${initialLocation.slug}_${adjustedIndex}.webp`;

      // Create a promise for each thumbnail
      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Still resolve on error
        img.src = thumbnailSrc;
      });

      thumbnailPromises.push(promise);
    }

    // When all thumbnails are loaded, set loading to false
    Promise.all(thumbnailPromises)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        // Even on error, we'll still try to show content
        setIsLoading(false);
      });

    // Start preloading full images after thumbnails
    setTimeout(() => {
      for (let i = 0; i < Math.min(5, initialLocation.photoCount); i++) {
        const adjustedIndex = i + 1;
        const fullSrc = `${process.env.NEXT_PUBLIC_IMAGES_URL}/${initialLocation.slug}/${initialLocation.slug}_${adjustedIndex}.jpg`;
        const img = new Image();
        img.src = fullSrc;
      }
    }, 500);
  }, [initialLocation]);

  return (
    <PortfolioProvider initialLocation={initialLocation}>
      <div className="h-[100dvh] flex flex-col">
        <LocationNavigation />
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <div className="scale-150">
              <PixelatedLoader />
            </div>
          </div>
        ) : (
          <PhotoCarousel />
        )}
        <PhotoCarouselFooter />
      </div>
    </PortfolioProvider>
  );
}
