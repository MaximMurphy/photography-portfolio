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
  const [hoverZone, setHoverZone] = useState<"prev" | "next" | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [transitionType, setTransitionType] = useState<"slide" | "fade">(
    "fade"
  );
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

  const fadeVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  };

  const navigate = (newDirection: number) => {
    setTransitionType("fade");
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
    setTransitionType("slide");
    if (info.offset.x > threshold) {
      navigate(-1);
    } else if (info.offset.x < -threshold) {
      navigate(1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.25) {
      setHoverZone("prev");
    } else if (x > width * 0.75) {
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
      className="relative w-full h-[64vh] pt-12 border-t border-stone-300"
      ref={constraintsRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Zones with Click Handlers */}
      <div
        className="absolute left-0 top-0 w-16 lg:w-48 h-full z-20 mt-12 cursor-none hover:bg-stone-300/50 transition-colors duration-200"
        onClick={() => navigate(-1)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      />
      <div
        className="absolute right-0 top-0 w-16 lg:w-48 h-full z-20 mt-12 cursor-none hover:bg-stone-300/50 transition-colors duration-200"
        onClick={() => navigate(1)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      />

      {/* Main Photo Container - Centered with 75% width */}
      <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPhotoIndex}
            custom={direction}
            variants={transitionType === "slide" ? slideVariants : fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              transitionType === "slide"
                ? {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 1 },
                    scale: { duration: 1 },
                  }
                : {
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                  }
            }
            className="absolute inset-0 w-full"
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
              className="object-scale-down"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cursor Indicators */}
      <AnimatePresence>
        {hoverZone && (
          <motion.div
            className="z-30 fixed text-stone-900 px-3 py-2 rounded pointer-events-none"
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

      {/* Progress Bar */}
      <div className="z-50 absolute bottom-4 right-72 flex gap-1">
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
