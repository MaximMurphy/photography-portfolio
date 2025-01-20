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
    const rect = e.currentTarget.getBoundingClientRect();

    // Get mouse coordinates relative to the container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    const width = rect.width;
    const ZONE_WIDTH = 208; // 52rem (w-52)
    const TOP_OFFSET = 32; // 8rem (lg:pt-8)
    const zoneHeight = rect.height - TOP_OFFSET;

    // Calculate the navigation zone boundaries based on the UI structure
    const zoneTop = TOP_OFFSET;
    const zoneBottom = zoneHeight - TOP_OFFSET; // Account for the h-[calc(100%-2rem)]

    // Check if we're in the navigation area
    if (mouseY >= zoneTop && mouseY <= zoneBottom) {
      // Left (prev) zone
      if (mouseX >= 0 && mouseX <= ZONE_WIDTH) {
        setHoverZone("prev");
      }
      // Right (next) zone
      else if (mouseX >= width - ZONE_WIDTH && mouseX <= width) {
        setHoverZone("next");
      }
      // Middle (no hover) zone
      else {
        setHoverZone(null);
      }
    } else {
      // Outside vertical bounds
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
              className="absolute left-0 top-8 w-52 h-[calc(100%-2rem)] z-20 cursor-none hover:bg-stone-400/20 transition-colors duration-200"
              onClick={() => navigate(-1)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
            />
            <div
              className="absolute right-0 top-8 w-52 h-[calc(100%-2rem)] z-20 cursor-none hover:bg-stone-400/20 transition-colors duration-200"
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
          <div className="lg:hidden absolute left-0 right-0 top-[calc(50%+5rem)] flex items-center">
            <div className="w-full flex justify-between items-center px-8">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-stone-500/50 rounded hover:bg-stone-600/50 transition-colors h-12"
              >
                <ChevronLeft className="w-6 h-6 text-stone-100" />
              </button>

              {/* Progress Bar - Centered between navigation buttons */}
              <div className="flex items-center justify-center py-4 h-20">
                <div className="w-48 flex justify-between h-full">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentPhotoIndex ? 1 : -1);
                        setCurrentPhotoIndex(index);
                      }}
                      className={`w-full ${
                        index === currentPhotoIndex
                          ? "bg-stone-100/80"
                          : "bg-stone-200/80"
                      } h-full`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate(1)}
                className="p-2 bg-stone-500/50 rounded hover:bg-stone-600/50 transition-colors h-12"
              >
                <ChevronRight className="w-6 h-6 text-stone-100" />
              </button>
            </div>
          </div>

          {/* Cursor Indicators - Desktop Only */}
          <AnimatePresence>
            {hoverZone && (
              <motion.div
                className="z-30 fixed text-stone-900 px-4 py-2 rounded-full pointer-events-none hidden lg:block"
                style={{
                  left: `${mousePosition.x - 30}px`,
                  top: `${mousePosition.y - 20}px`,
                  transform: "translate(-50%, -50%)",
                }}
                initial="initial"
                animate={isPressed ? "pressed" : "animate"}
                exit="exit"
                variants={indicatorVariants}
                transition={{ duration: 0.25 }}
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
      <div className="hidden lg:flex items-center justify-center py-4">
        <div className="w-1/2 flex justify-between">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPhotoIndex ? 1 : -1);
                setCurrentPhotoIndex(index);
              }}
              className={`w-full h-2 ${
                index === currentPhotoIndex
                  ? "bg-stone-100/80"
                  : "bg-stone-200/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
