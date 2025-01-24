import { motion } from "framer-motion";

export default function PixelatedLoader() {
  const squares = [
    { id: 0, initialDelay: 0 }, // Top-left
    { id: 1, initialDelay: 0.25 }, // Top-right
    { id: 3, initialDelay: 0.75 }, // Bottom-left
    { id: 2, initialDelay: 0.5 }, // Bottom-right
  ];

  return (
    <div className="relative w-12 lg:w-48 h-12 lg:h-48">
      <div className="grid grid-cols-2 gap-2">
        {squares.map(({ id, initialDelay }) => (
          <motion.div
            key={id}
            className="w-full pt-[100%] bg-stone-800"
            animate={{ opacity: [0.25, 0.75, 0.25] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "easeInOut",
              delay: initialDelay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
