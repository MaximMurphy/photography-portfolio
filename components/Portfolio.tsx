"use client";

import { useEffect } from "react";
import { PhotoCarousel } from "./PhotoCarousel";
import { LocationNavigation } from "./LocationNavigation";
import { PortfolioProvider } from "./PortfolioContext";
import type { PortfolioProps } from "@/types/portfolio";
import PhotoCarouselFooter from "./PhotoCarouselFooter";

export function Portfolio({ initialLocation }: PortfolioProps) {
  // Preload first few images on mount
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload first 3 images
    for (let i = 0; i < Math.min(3, initialLocation.photoCount); i++) {
      const adjustedIndex = i + 1;
      preloadImage(
        `${process.env.NEXT_PUBLIC_IMAGES_URL}/${initialLocation.slug}/${initialLocation.slug}_${adjustedIndex}.jpg`
      );
      preloadImage(
        `/photos/${initialLocation.slug}/${initialLocation.slug}_${adjustedIndex}.webp`
      );
    }
  }, [initialLocation]);

  return (
    <PortfolioProvider initialLocation={initialLocation}>
      <div className="h-screen flex flex-col">
        <LocationNavigation />
        <PhotoCarousel />
        <PhotoCarouselFooter />
      </div>
    </PortfolioProvider>
  );
}
