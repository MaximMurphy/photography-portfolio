import React from "react";
import { motion } from "framer-motion";

export default function PhotoCarouselFooter() {
  return (
    <div className="px-2 lg:px-4 py-2 text-xl md:text-2xl font-base tracking-widest">
      <div className="flex justify-between pt-2 lg:pt-4 border-t border-stone-400">
        <span>by</span>
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
  );
}
