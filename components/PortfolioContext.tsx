"use client";

import { createContext, useContext, useState } from "react";
import { CarouselContextType, City } from "../types/portfolio";

const cities: City[] = [
  {
    name: "Galway",
    photos: [
      { src: "/galway_1.jpg", alt: "Galway 1", id: 1 },
      { src: "/galway_2.jpg", alt: "Galway 2", id: 2 },
      { src: "/galway_3.jpg", alt: "Galway 3", id: 3 },
    ],
  },
  {
    name: "Cliffs of Moher",
    photos: [
      { src: "/cliffsofmoher_1.jpg", alt: "Cliffs of Moher 1", id: 1 },
      { src: "/cliffsofmoher_2.jpg", alt: "Cliffs of Moher 2", id: 2 },
      { src: "/cliffsofmoher_3.jpg", alt: "Cliffs of Moher 3", id: 3 },
      { src: "/cliffsofmoher_4.jpg", alt: "Cliffs of Moher 4", id: 4 },
    ],
  },
];

const PortfolioContext = createContext<CarouselContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  return (
    <PortfolioContext.Provider
      value={{
        currentCityIndex,
        setCurrentCityIndex,
        currentPhotoIndex,
        setCurrentPhotoIndex,
        cities,
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
