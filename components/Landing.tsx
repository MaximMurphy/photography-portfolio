"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSvg from "./AnimatedSVG";

const desktopPositions = [
  { top: "20%", left: "10%" },
  { top: "22%", left: "80%" },
  { top: "18%", left: "56%" },
  { top: "42%", left: "35%" },
  { top: "58%", left: "80%" },
  { top: "60%", left: "15%" },
  { top: "65%", left: "55%" },
];

const mobilePositions = [
  { top: "15%", left: "10%" },
  { top: "20%", left: "70%" },
  { top: "50%", left: "70%" },
  { top: "35%", left: "35%" },
  { top: "55%", left: "10%" },
  { top: "72%", left: "60%" },
  { top: "75%", left: "15%" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  const positions = isMobile ? mobilePositions : desktopPositions;

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-green-950 text-stone-300">
      {[
        "ireland",
        "uk",
        "france",
        "ohio",
        "mexico",
        "california",
        "maryland",
      ].map((name, index) => (
        <AnimatedSvg key={name} name={name} position={positions[index]} />
      ))}
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="h-full"
      >
        <div className="h-full flex flex-col justify-between px-2 lg:px-4 py-2 text-xl md:text-2xl font-base tracking-widest text-justify">
          <div className="flex justify-between pb-2 lg:pb-4 border-b border-stone-300">
            <span className="hover:text-stone-950 transition duration-500 cursor-default">
              35
            </span>
            <motion.div
              className="relative cursor-default overflow-hidden"
              whileHover="expanded"
              initial="collapsed"
              animate="collapsed"
            >
              <div className="relative flex">
                <motion.div
                  className="flex items-center"
                  variants={{
                    collapsed: { width: "auto" },
                    expanded: { width: "auto" },
                  }}
                >
                  <motion.span
                    variants={{
                      collapsed: { x: 0 },
                      expanded: { x: 0 },
                    }}
                  >
                    m
                  </motion.span>
                  <motion.span
                    variants={{
                      collapsed: { width: 0, x: "100%" },
                      expanded: { width: "auto", x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    illi
                  </motion.span>
                  <motion.span
                    className="ml-0"
                    variants={{
                      collapsed: { x: 0 },
                      expanded: { x: 0 },
                    }}
                  >
                    m
                  </motion.span>
                  <motion.span
                    variants={{
                      collapsed: { width: 0, x: "100%" },
                      expanded: { width: "auto", x: 0 },
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    eter
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-between pt-2 lg:pt-4 border-t border-stone-300">
            <span className="hover:text-stone-950 transition duration-500 cursor-default">
              by
            </span>
            <motion.div
              className="relative cursor-default overflow-hidden"
              whileHover="expanded"
              initial="collapsed"
              animate="collapsed"
            >
              <div className="relative flex">
                <motion.div
                  className="flex items-center"
                  variants={{
                    collapsed: { width: "auto" },
                    expanded: { width: "auto" },
                  }}
                >
                  <motion.span
                    variants={{
                      collapsed: { x: 0 },
                      expanded: { x: 0 },
                    }}
                  >
                    M
                  </motion.span>
                  <motion.span
                    variants={{
                      collapsed: { width: 0, x: "100%" },
                      expanded: { width: "auto", x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    axim
                  </motion.span>
                  <motion.span
                    className="ml-0"
                    variants={{
                      collapsed: { x: 0 },
                      expanded: { x: 0 },
                    }}
                  >
                    M
                  </motion.span>
                  <motion.span
                    variants={{
                      collapsed: { width: 0, x: "100%" },
                      expanded: { width: "auto", x: 0 },
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    urphy
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.h1>
    </div>
  );
}
