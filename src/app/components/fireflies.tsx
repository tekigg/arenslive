"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useAnimationControls, AnimationControls } from "framer-motion";

interface Firefly {
  id: number;
  x: number;
  y: number;
}

interface FireflyProps {
  initialX: number;
  initialY: number;
  delay: number;
  containerWidth: number;
  containerHeight: number;
}

const FireflyAnimation: React.FC = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const generateFireflies = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
      const newFireflies: Firefly[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
      setFireflies(newFireflies);
    }
  }, []);

  useEffect(() => {
    generateFireflies();
    window.addEventListener("resize", generateFireflies);
    return () => window.removeEventListener("resize", generateFireflies);
  }, [generateFireflies]);

  const getRandomOffset = useCallback(
    (maxDistance: number): { x: number; y: number } => {
      return {
        x: (Math.random() - 0.5) * 2 * maxDistance,
        y: (Math.random() - 0.5) * 2 * maxDistance,
      };
    },
    []
  );

  const Firefly: React.FC<FireflyProps> = ({
    initialX,
    initialY,
    delay,
    containerWidth,
    containerHeight,
  }) => {
    const controls: AnimationControls = useAnimationControls();

    const animateFirefly = useCallback(async () => {
      while (true) {
        const maxDistance = Math.min(containerWidth, containerHeight) * 0.1; // 10% of container size
        const offset = getRandomOffset(maxDistance);
        const shouldFlicker = Math.random() < 0.005; // 0.5% chance of flickering
        await controls.start({
          x: initialX + offset.x,
          y: initialY + offset.y,
          opacity: shouldFlicker ? [0.7, 0, 0.7] : 0.7,
          transition: {
            duration: 1 + Math.random() * 2, // Random duration between 3-5 seconds
            ease: "easeInOut",
          },
        });
      }
    }, [
      controls,
      containerWidth,
      containerHeight,
      initialX,
      initialY,
      getRandomOffset,
    ]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        animateFirefly();
      }, delay);
      return () => clearTimeout(timeoutId);
    }, [animateFirefly, delay]);

    return (
      <motion.div
        className="absolute w-1 h-1 bg-[#BCEE6A] opacity-70 after:content-[''] after:w-4 after:h-4 after:bg-[#BCEE6A] after:opacity-70 after:blur-lg after:rounded-full after:absolute after:-top-2 after:-left-2 after:z-[-1]"
        initial={{ x: initialX, y: initialY, opacity: 0}}
        animate={controls}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className="h-[30vh] pointer-events-none bg-gradient-to-t from-[#bbee6a18] to-transparent w-full  fixed bottom-0 z-10"
    >
      {fireflies.map((firefly, index) => (
        <Firefly
          key={firefly.id}
          initialX={firefly.x}
          initialY={firefly.y}
          delay={index * 200} // Stagger the start of each firefly's animation
          containerWidth={containerSize.width}
          containerHeight={containerSize.height}
        />
      ))}
    </div>
  );
};

export default FireflyAnimation;
