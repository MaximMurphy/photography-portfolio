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
      className="h-full flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-1 relative">
        {/* Main content wrapper with top padding */}
        <div className="absolute inset-0 pt-2 lg:pt-8">
          {/* Navigation Zones with Click Handlers - Desktop Only */}
          <div className="hidden lg:block">
            <div
              className="absolute left-0 top-8 w-48 h-[calc(100%-2rem)] z-20 cursor-none hover:bg-stone-400/25 transition-colors duration-200"
              onClick={() => navigate(-1)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
            />
            <div
              className="absolute right-0 top-8 w-48 h-[calc(100%-2rem)] z-20 cursor-none hover:bg-stone-400/25 transition-colors duration-200"
              onClick={() => navigate(1)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
            />
          </div>

          {/* Main Photo Container - Centered with 75% width */}
          <div className="absolute left-1/2 -translate-x-1/2 w-5/6 lg:w-3/4 h-[calc(100%/2)] lg:h-[calc(100%-2rem)] mt-8 lg:mt-0">
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
                className="absolute inset-0 w-full h-full"
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

          {/* Mobile Navigation and Progress Bar Container */}
          <div className="lg:hidden absolute left-0 right-0 top-[calc(50%+6rem)] flex items-center">
            <div className="w-full flex justify-between px-8">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-stone-600/50 rounded hover:bg-stone-800/50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Progress Bar - Centered between navigation buttons */}
              <div className="flex justify-center gap-1">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentPhotoIndex ? 1 : -1);
                      setCurrentPhotoIndex(index);
                    }}
                    className={`w-1 h-8 ${
                      index === currentPhotoIndex
                        ? "bg-stone-100"
                        : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="p-2 bg-stone-600/50 rounded hover:bg-stone-800/50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
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
        </div>
      </div>

      {/* Desktop Progress Bar */}
      <div className="hidden lg:flex justify-center gap-1 py-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPhotoIndex ? 1 : -1);
              setCurrentPhotoIndex(index);
            }}
            className={`w-1 h-8 ${
              index === currentPhotoIndex ? "bg-stone-100" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
