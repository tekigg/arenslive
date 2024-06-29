"use client";

import { useEffect, useMemo, useState } from "react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { IRepulse } from "@tsparticles/interaction-external-repulse";
import {
  loadExternalRepulseInteraction,
  Repulse,
} from "@tsparticles/interaction-external-repulse";

const FireflyAnimation: React.FC = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadExternalRepulseInteraction(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        resize: true,
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 2,
            factor: 100,
            speed: 0.1,
            maxSpeed: 50,
            easing: "ease-out-quint",
          } as IRepulse,
        },
      },
      particles: {
        color: {
          value: "#BCEE6A",
        },
        move: {
          direction: MoveDirection.none,
          enable: true,

          outModes: {
            default: OutMode.out,
          },
          random: true,
          bounce: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 200,
        },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: {
            enable: true,
            speed: 0.6,
            minimumValue: 0,
            sync: false,
          },
          random: true,
        },
        shape: {
          type: "square",
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );
  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };
  return (
    <Particles

      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
};

export default FireflyAnimation;
