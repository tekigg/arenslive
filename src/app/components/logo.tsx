"use client";

import React from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { StreamersLoaded } from "../atoms/atoms";

const Logo: React.FC = () => {
  const [loaded, setLoaded] = useAtom(StreamersLoaded);

  const springY = useSpring(loaded[0] ? 0 : -200, {
    stiffness: 421,
    damping: 58
  });

  return (
    <motion.div
    className="z-50 fixed"
      style={{ y: springY }}
      animate={{
        y: loaded ? [0, -10, 0] : -200,
        rotateZ: [-2, 2, -2],
      }}
      transition={{
        y: {
          repeat: loaded ? Infinity : 0,
          duration: 4,
          ease: "easeInOut",
        },
        rotateZ: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        },
      }}
    >
      <Image
        src="/assets/arens.svg"
        alt="Hero"
        className="h-full"
        width={192}
        height={192}
        objectFit="cover"
      />
    </motion.div>
  );
};

export default Logo;
