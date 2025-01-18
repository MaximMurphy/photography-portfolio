"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSvg from "./AnimatedSVG";

const svgPositions = [
  { top: "10%", left: "20%" },
  { top: "20%", left: "80%" },
  { top: "40%", left: "5%" },
  { top: "15%", left: "45%" },
  { top: "60%", left: "85%" },
  { top: "80%", left: "20%" },
  { top: "75%", left: "60%" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-500 text-stone-200">
      {[2, 3, 4, 5, 6, 7, 8].map((num, index) => (
        <AnimatedSvg key={num} number={num} position={svgPositions[index]} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1
          className="text-4xl md:text-6xl font-medium text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="block">35mm Film Photos</span>
          <span className="block mt-2">By Maxim Murphy</span>
        </motion.h1>
      </div>
    </div>
  );
}
