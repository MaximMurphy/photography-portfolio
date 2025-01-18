"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AnimatedSvgProps {
  number: number;
  position: { top: string; left: string };
}

export default function AnimatedSvg({ number, position }: AnimatedSvgProps) {
  const randomOffset = () => ({
    x: Math.random() * 40 - 20,
    y: Math.random() * 40 - 20,
  });

  return (
    <motion.div
      className="absolute w-16 h-16 md:w-24 md:h-24"
      style={position}
      animate={{
        x: [0, randomOffset().x, 0, randomOffset().x, 0],
        y: [0, randomOffset().y, 0, randomOffset().y, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Link href={`/portfolio/${number}`} className="block w-full h-full">
        <Image
          src={`/SVG/${number}.svg`}
          alt={`SVG ${number}`}
          width={96}
          height={96}
          className="w-full h-full cursor-pointer"
        />
      </Link>
    </motion.div>
  );
}
