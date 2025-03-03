"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Location } from "@/types/portfolio";

type PortfolioContextType = {
  currentLocation: Location;
  currentPhotoIndex: number;
  setCurrentPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLocation: (location: Location) => void;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({
  children,
  initialLocation,
}: {
  children: React.ReactNode;
  initialLocation: Location;
}) {
  const [currentLocation, setLocation] = useState<Location>(initialLocation);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const setCurrentLocation = useCallback((location: Location) => {
    setLocation(location);
    setCurrentPhotoIndex(0);

    // Preload all thumbnails when changing location
    const preloadThumbnails = async () => {
      // Preload first 5 thumbnails with high priority
      const highPriorityPromises = [];
      for (let i = 0; i < Math.min(5, location.photoCount); i++) {
        const index = i + 1;
        const src = `/photos/${location.slug}/${location.slug}_${index}.webp`;
        highPriorityPromises.push(
          fetch(src, {
            cache: "force-cache",
            priority: "high",
            headers: { "Cache-Control": "max-age=31536000" },
          }).catch(() => {
            /* Silent catch */
          })
        );
      }

      // Wait for high priority thumbnails to load first
      await Promise.all(highPriorityPromises);

      // Then load the rest of thumbnails
      for (let i = 5; i < location.photoCount; i++) {
        const index = i + 1;
        const src = `/photos/${location.slug}/${location.slug}_${index}.webp`;
        fetch(src, {
          cache: "force-cache",
          headers: { "Cache-Control": "max-age=31536000" },
        }).catch(() => {
          /* Silent catch */
        });
      }
    };

    preloadThumbnails();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        currentLocation,
        currentPhotoIndex,
        setCurrentPhotoIndex,
        setCurrentLocation,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }

  return context;
}
