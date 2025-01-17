"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  PanInfo,
} from "framer-motion";
import { usePortfolio } from "./PortfolioContext";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoCarousel() {
  const { currentCityIndex, currentPhotoIndex, setCurrentPhotoIndex, cities } =
    usePortfolio();
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showIndicator, setShowIndicator] = useState<"prev" | "next" | null>(
    null
  );
  const [isPressed, setIsPressed] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const city = cities[currentCityIndex];
  const photos = city.photos;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
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

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate(-1);
    } else if (info.offset.x < -threshold) {
      navigate(1);
    }
  };

  const getPrevPhoto = () => {
    if (photos.length === 0)
      return { src: "/placeholder.svg", alt: "Placeholder" };
    const prevIndex =
      currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
    return photos[prevIndex];
  };

  const getNextPhoto = () => {
    if (photos.length === 0)
      return { src: "/placeholder.svg", alt: "Placeholder" };
    const nextIndex =
      currentPhotoIndex === photos.length - 1 ? 0 : currentPhotoIndex + 1;
    return photos[nextIndex];
  };

  const handleMouseMove = (e: React.MouseEvent, type: "prev" | "next") => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowIndicator(type);
  };

  const handleMouseLeave = () => {
    setShowIndicator(null);
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
    <div className="relative w-full h-[62vh]" ref={constraintsRef}>
      {/* Previous Photo Preview */}
      <div
        onClick={() => navigate(-1)}
        onMouseMove={(e) => handleMouseMove(e, "prev")}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-48 h-72 opacity-75 hover:opacity-90 z-10 cursor-none"
      >
        <Image
          src={getPrevPhoto().src || "/placeholder.svg"}
          alt="Previous"
          fill
          className="object-cover"
        />
        <AnimatePresence>
          {showIndicator === "prev" && (
            <motion.div
              className="absolute bg-stone-200 text-stone-800 px-3 py-2 rounded pointer-events-none"
              style={{
                left: `${mousePosition.x - 20}px`,
                top: `${mousePosition.y - 10}px`,
              }}
              initial="initial"
              animate={isPressed ? "pressed" : "animate"}
              exit="exit"
              variants={indicatorVariants}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
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
            opacity: { duration: 1 },
            scale: { duration: 1 },
          }}
          className="absolute inset-0 w-full border border-red-500"
          drag="x"
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          <Image
            src={photos[currentPhotoIndex].src || "/placeholder.svg"}
            alt={photos[currentPhotoIndex].alt}
            fill
            className="object-cover"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Next Photo Preview */}
      <div
        onClick={() => navigate(1)}
        onMouseMove={(e) => handleMouseMove(e, "next")}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-48 h-72 opacity-75 hover:opacity-90 z-10 cursor-none"
      >
        <Image
          src={getNextPhoto().src || "/placeholder.svg"}
          alt="Next"
          fill
          className="object-cover"
        />
        <AnimatePresence>
          {showIndicator === "next" && (
            <motion.div
              className="absolute bg-stone-200 text-stone-800 px-3 py-2 rounded pointer-events-none"
              style={{
                left: `${mousePosition.x - 20}px`,
                top: `${mousePosition.y - 10}px`,
              }}
              initial="initial"
              animate={isPressed ? "pressed" : "animate"}
              exit="exit"
              variants={indicatorVariants}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="z-50 absolute bottom-4 right-4 flex gap-1">
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
