"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";

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

  const getRandomPosition = useCallback(
    (currentX: number, currentY: number): { x: number; y: number } => {
      const maxDistance = Math.min(containerSize.width, containerSize.height) * 0.1;
      const newX = Math.max(0, Math.min(containerSize.width, currentX + (Math.random() - 0.5) * 2 * maxDistance));
      const newY = Math.max(0, Math.min(containerSize.height, currentY + (Math.random() - 0.5) * 2 * maxDistance));
      return { x: newX, y: newY };
    },
    [containerSize]
  );

  const Firefly: React.FC<FireflyProps> = ({
    initialX,
    initialY,
    delay,
    containerWidth,
    containerHeight,
  }) => {
    const fireflyRef = useRef<HTMLDivElement>(null);
    const currentPosition = useRef({ x: initialX, y: initialY });

    const animateFirefly = useCallback(() => {
      if (!fireflyRef.current) return;

      const newPosition = getRandomPosition(currentPosition.current.x, currentPosition.current.y);
      const duration = 3000 + Math.random() * 2000;
      const shouldFlicker = Math.random() < 0.1; // 10% chance of flickering

      const keyframes = [
        { 
          transform: `translate(${currentPosition.current.x}px, ${currentPosition.current.y}px)`,
          opacity: 0.7 
        },
        ...(shouldFlicker ? [{ opacity: 0 }, { opacity: 0.7 }] : []),
        { 
          transform: `translate(${newPosition.x}px, ${newPosition.y}px)`,
          opacity: 0.7
        }
      ];

      const animation = fireflyRef.current.animate(keyframes, {
        duration,
        easing: 'ease-in-out',
        fill: 'forwards',
      });

      currentPosition.current = newPosition;

      animation.onfinish = () => {
        animateFirefly();
      };
    }, [getRandomPosition]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        animateFirefly();
      }, delay);
      return () => clearTimeout(timeoutId);
    }, [animateFirefly, delay]);

    return (
      <div
        ref={fireflyRef}
        className="absolute w-1 h-1 bg-[#BCEE6A] opacity-70 after:content-[''] after:w-4 after:h-4 after:bg-[#BCEE6A] after:opacity-70 after:blur-lg after:rounded-full after:absolute after:-top-2 after:-left-2 after:z-[-1]"
        style={{ transform: `translate(${initialX}px, ${initialY}px)` }}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className="h-[30vh] pointer-events-none bg-gradient-to-t from-[#bbee6a18] to-transparent w-full fixed bottom-0 z-10"
    >
      {fireflies.map((firefly, index) => (
        <Firefly
          key={firefly.id}
          initialX={firefly.x}
          initialY={firefly.y}
          delay={index * 200}
          containerWidth={containerSize.width}
          containerHeight={containerSize.height}
        />
      ))}
    </div>
  );
};

export default FireflyAnimation;