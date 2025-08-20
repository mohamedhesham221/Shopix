"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

const TextFade = ({ direction, children, staggerChildren = 0.1, className, isOnce= false }) => {
  const FADE_DOWN = {
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
    hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: isOnce });

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "show" : ""}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
            },
          },
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <motion.div variants={FADE_DOWN} className={className}>{child}</motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    </>
  );
};

export default TextFade;
