"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Location } from "@/types/portfolio";
import { getAllLocations } from "@/lib/locations";

type PortfolioContextType = {
  currentLocation: Location;
  currentPhotoIndex: number;
  setCurrentPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLocation: (location: Location) => void;
  navigateToNextLocation: () => void;
  navigateToPrevLocation: () => void;
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
  const locations = getAllLocations();

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

  // Navigation between locations
  const navigateToNextLocation = useCallback(() => {
    const currentIndex = locations.findIndex(
      (loc) => loc.slug === currentLocation.slug
    );
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  }, [locations, currentLocation.slug, setCurrentLocation]);

  const navigateToPrevLocation = useCallback(() => {
    const currentIndex = locations.findIndex(
      (loc) => loc.slug === currentLocation.slug
    );
    const prevIndex =
      currentIndex <= 0 ? locations.length - 1 : currentIndex - 1;
    setCurrentLocation(locations[prevIndex]);
  }, [locations, currentLocation.slug, setCurrentLocation]);

  // Navigation between photos
  const navigateToNextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= currentLocation.photoCount) return 0;
      return nextIndex;
    });
  }, [currentLocation.photoCount]);

  const navigateToPrevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) return currentLocation.photoCount - 1;
      return prevIndex;
    });
  }, [currentLocation.photoCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          navigateToPrevPhoto();
          break;
        case "ArrowRight":
          navigateToNextPhoto();
          break;
        case "ArrowUp":
          navigateToPrevLocation();
          break;
        case "ArrowDown":
          navigateToNextLocation();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    navigateToNextPhoto,
    navigateToPrevPhoto,
    navigateToNextLocation,
    navigateToPrevLocation,
  ]);

  return (
    <PortfolioContext.Provider
      value={{
        currentLocation,
        currentPhotoIndex,
        setCurrentPhotoIndex,
        setCurrentLocation,
        navigateToNextLocation,
        navigateToPrevLocation,
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
