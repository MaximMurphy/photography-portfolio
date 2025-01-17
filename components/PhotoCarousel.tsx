"'use client'";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "./PortfolioContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function PhotoCarousel() {
  const { currentCityIndex, currentPhotoIndex, setCurrentPhotoIndex, cities } =
    usePortfolio();
  const [direction, setDirection] = useState(0);

  const city = cities[currentCityIndex];
  const photos = city.photos;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    // @ts-expect-error - Type mismatch doesnt affect code
    setCurrentPhotoIndex((prev: number) => {
      const nextIndex = prev + newDirection;
      if (nextIndex >= photos.length) return 0;
      if (nextIndex < 0) return photos.length - 1;
      return nextIndex;
    });
  };

  const getPrevPhoto = () => {
    const prevIndex =
      currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
    return photos[prevIndex];
  };

  const getNextPhoto = () => {
    const nextIndex =
      currentPhotoIndex === photos.length - 1 ? 0 : currentPhotoIndex + 1;
    return photos[nextIndex];
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Previous Photo Preview */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-50 z-10">
        <Image
          src={getPrevPhoto().src || "/placeholder.svg"}
          alt="Previous"
          fill
          className="object-cover"
        />
      </div>

      {/* Main Photo */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentPhotoIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={photos[currentPhotoIndex].src || "/placeholder.svg"}
            alt={photos[currentPhotoIndex].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Next Photo Preview */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-50 z-10">
        <Image
          src={getNextPhoto().src || "/placeholder.svg"}
          alt="Next"
          fill
          className="object-cover"
        />
      </div>

      {/* Navigation Controls */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPhotoIndex ? 1 : -1);
              setCurrentPhotoIndex(index);
            }}
            className={`w-1 h-8 ${
              index === currentPhotoIndex ? "'bg-white'" : "'bg-white/50'"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
