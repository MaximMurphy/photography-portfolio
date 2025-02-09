"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MagneticEffect from "@/components/Landing/MagneticEffect";

interface AnimatedSvgProps {
  name: string;
  position: { top: string; left: string };
}

export default function AnimatedSvg({ name, position }: AnimatedSvgProps) {
  const randomOffset = () => ({
    x: Math.random() * 60 - 40,
    y: Math.random() * 60 - 40,
  });

  return (
    <motion.div
      className="absolute w-24 h-24 md:w-40 md:h-40"
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
      <Link href={`/portfolio/${name}`} className="block w-full h-full">
        <MagneticEffect>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, delay: 0.25 }}
          >
            <Image
              src={`/SVG/${name}.svg`}
              alt={`SVG ${name}`}
              width={150}
              height={150}
              className="w-full h-full cursor-none hover:scale-110 transition duration-500"
            />
          </motion.div>
        </MagneticEffect>
      </Link>
    </motion.div>
  );
}
