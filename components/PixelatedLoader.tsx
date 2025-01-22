import { motion } from "framer-motion";

export default function PixelatedLoader() {
  // Create a 10x10 grid of squares
  const squares = Array.from({ length: 100 });

  return (
    <div className="relative w-64 h-64">
      <div className="grid grid-cols-10 gap-1">
        {squares.map((_, i) => (
          <motion.div
            key={i}
            className="w-full pt-[100%] bg-stone-900"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
              delay: Math.random() * 0.5, // Randomize the start time for each square
            }}
          />
        ))}
      </div>
    </div>
  );
}
