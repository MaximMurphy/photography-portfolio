"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "./PortfolioContext";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PixelatedLoader from "./PixelatedLoader";

export function PhotoCarousel() {
  const { currentLocation, currentPhotoIndex, setCurrentPhotoIndex } =
    usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverZone, setHoverZone] = useState<"prev" | "next" | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const photos = currentLocation.photos;

  const fadeVariants = {
    initial: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const navigate = (newDirection: number) => {
    //@ts-expect-error - TS doenst like the number type here
    setCurrentPhotoIndex((prev: number) => {
      const nextIndex = prev + newDirection;
      if (nextIndex >= photos.length) return 0;
      if (nextIndex < 0) return photos.length - 1;
      return nextIndex;
    });
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    const width = rect.width;
    const ZONE_WIDTH = 208;
    const TOP_OFFSET = 32;
    const zoneHeight = rect.height - TOP_OFFSET;
    const zoneTop = TOP_OFFSET;
    const zoneBottom = zoneHeight - TOP_OFFSET;

    if (mouseY >= zoneTop && mouseY <= zoneBottom) {
      if (mouseX >= 0 && mouseX <= ZONE_WIDTH) {
        setHoverZone("prev");
      } else if (mouseX >= width - ZONE_WIDTH && mouseX <= width) {
        setHoverZone("next");
      } else {
        setHoverZone(null);
      }
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
      className="relative w-full h-full flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main content wrapper */}
      <div className="relative h-full">
        {/* Navigation Zones with Click Handlers - Desktop Only */}
        <div className="hidden lg:block">
          <div
            className="absolute left-0 top-0 w-52 h-full z-20 cursor-none hover:bg-stone-400/20 transition-colors duration-200"
            onClick={() => navigate(-1)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
          />
          <div
            className="absolute right-0 top-0 w-52 h-full z-20 cursor-none hover:bg-stone-400/20 transition-colors duration-200"
            onClick={() => navigate(1)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
          />
        </div>

        {/* Main Photo Container */}
        {isImageLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <PixelatedLoader />
          </div>
        )}
        <div className="relative w-full h-[calc(100%-2rem)] max-h-[80vh] lg:h-full flex items-center justify-center border border-red-500">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentPhotoIndex}
              variants={fadeVariants}
              initial="initial"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute w-5/6 lg:w-3/4 h-full"
            >
              <Image
                src={photos[currentPhotoIndex].src}
                alt={photos[currentPhotoIndex].alt}
                fill
                priority
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="object-scale-down"
                draggable={false}
                onLoad={handleImageLoad}
                placeholder="blur"
                blurDataURL={`${photos[currentPhotoIndex].src}?w=10&h=10&blur=20`}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Progress Bar Container */}
        <div className="lg:hidden absolute left-0 right-0 bottom-4 flex items-center justify-center">
          <div className="w-48 flex justify-between">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-full h-6 ${
                  index === currentPhotoIndex
                    ? "bg-stone-400/30"
                    : "bg-stone-400/10"
                }`}
              />
            ))}
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

      {/* Desktop Progress Bar */}
      <div className="hidden lg:flex items-center justify-center py-4">
        <div className="w-1/2 flex justify-between">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-full h-2 ${
                index === currentPhotoIndex
                  ? "bg-stone-400/30"
                  : "bg-stone-400/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
