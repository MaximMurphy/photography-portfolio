"use client";

import { createContext, useContext, useState } from "react";
import type { Location, PortfolioContextType } from "@/types/portfolio";

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({
  children,
  initialLocation,
}: {
  children: React.ReactNode;
  initialLocation: Location;
}) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  return (
    <PortfolioContext.Provider
      value={{
        currentLocation: initialLocation,
        currentPhotoIndex,
        setCurrentPhotoIndex,
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
