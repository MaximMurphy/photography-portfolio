"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "./PortfolioContext";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoCarousel() {
  const { currentLocation, currentPhotoIndex, setCurrentPhotoIndex } =
    usePortfolio();
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverZone, setHoverZone] = useState<"prev" | "next" | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const photos = currentLocation.photos;

  const fadeVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    //@ts-expect-error - ignore this line
    setCurrentPhotoIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex >= photos.length) return 0;
      if (nextIndex < 0) return photos.length - 1;
      return nextIndex;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < 192) {
      setHoverZone("prev");
    } else if (x > width - 192) {
      setHoverZone("next");
    } else {
      setHoverZone(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverZone(null);
    setIsPressed(false);
  };

  const indicatorVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    pressed: {
      opacity: 0.8,
      scale: 0.8,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
    },
  };

  return (
    <div
      className="relative w-full h-[64vh] lg:pt-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Zones with Click Handlers - Desktop Only */}
      <div className="hidden lg:block">
        <div
          className="absolute left-0 top-0 w-48 h-full z-20 mt-12 cursor-none hover:bg-stone-300/50 transition-colors duration-200"
          onClick={() => navigate(-1)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
        />
        <div
          className="absolute right-0 top-0 w-48 h-full z-20 mt-12 cursor-none hover:bg-stone-300/50 transition-colors duration-200"
          onClick={() => navigate(1)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
        />
      </div>

      {/* Main Photo Container - Centered with 75% width */}
      <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-96 lg:h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPhotoIndex}
            custom={direction}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full"
          >
            <Image
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              priority={currentPhotoIndex === 0}
              className="object-scale-down"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="lg:hidden absolute bottom-24 left-0 right-0 flex justify-center gap-52 z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-stone-600/50 rounded hover:bg-stone-800/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="p-2 bg-stone-600/50 rounded hover:bg-stone-800/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Cursor Indicators - Desktop Only */}
      <AnimatePresence>
        {hoverZone && (
          <motion.div
            className="z-30 fixed text-stone-900 px-3 py-2 rounded pointer-events-none hidden lg:block"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            initial="initial"
            animate={isPressed ? "pressed" : "animate"}
            exit="exit"
            variants={indicatorVariants}
            transition={{ duration: 0.2 }}
          >
            {hoverZone === "prev" ? (
              <ChevronLeft className="w-12 h-12" />
            ) : (
              <ChevronRight className="w-12 h-12" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar - Responsive Position */}
      <div className="z-50 absolute left-1/2 -translate-x-1/2 flex gap-1 lg:left-auto lg:-translate-x-0 lg:right-72 bottom-24 lg:-bottom-12">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPhotoIndex ? 1 : -1);
              setCurrentPhotoIndex(index);
            }}
            className={`w-1 h-8 ${
              index === currentPhotoIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
