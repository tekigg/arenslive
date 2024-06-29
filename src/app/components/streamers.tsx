"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { type StreamerInfo } from "../atoms/atoms";
import ActiveStreamer from "./subcomponents/activeStreamer";
import Socials from "./subcomponents/links";
import Creator from "./subcomponents/creator";

type StreamersProps = {
  streamers: StreamerInfo[];
};

const containerVariants = {
  selected: { opacity: 0.6, scale: 0.8 },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerDirection: 1,
      when: "beforeChildren",
      from: "center",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  selected: { opacity: 0, scale: 0.8 },
  hidden: { opacity: 0, y: 100, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      y: { type: "spring", stiffness: 100, damping: 10 },
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const OfflineStreamer: React.FC<StreamerInfo> = (streamer) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="w-screen h-full text-white flex flex-wrap gap-8 px-6 items-center justify-center"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Creator {...streamer} />
    </motion.div>
  );
};

const Streamers: React.FC<StreamersProps> = ({ streamers }) => {
  const controls = useAnimation();
  const [selectedStreamer, setSelectedStreamer] = useState<StreamerInfo | null>(
    null
  );

  useEffect(() => {
    if (streamers) {
      controls.start("visible");
    }
    selectedStreamer ? controls.start("hidden") : controls.start("visible");
  }, [controls, selectedStreamer, streamers]);

  if (!streamers) {
    return <div>No streamers</div>;
  }

  const activeStreamers = streamers.filter((streamer) => streamer.isLive);
  const nonActiveStreamers = streamers.filter((streamer) => !streamer.isLive);

  const handleSelectStreamer = (streamer: StreamerInfo) => {
    setSelectedStreamer(streamer);
  };

  const handleCloseSelected = () => {
    setSelectedStreamer(null);
  };

  if (activeStreamers.length === 0) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ["circInOut"] }}
          className="w-screen flex flex-col items-center justify-center text-white/40 text-center"
        >
          <p>No streamers are live right now :c</p>
          <p>But check out the rest of the awesome streamers below! :D</p>
        </motion.div>
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            className="mt-28 flex flex-col gap-4"
            transition={{
              staggerChildren: 0.2,
              delayChildren: 0.5,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ["circInOut"] }}
              className="w-screen flex flex-col gap-4 items-center justify-center text-white/60 mb-12"
            >
              <p>
                <span className="bg-gray-700 py-1 px-2 rounded-md text-white/80 font-bold mr-2">
                  OFFLINE
                </span>{" "}
                creators
              </p>
            </motion.div>
            {nonActiveStreamers.map((streamer, index) => (
              <OfflineStreamer key={streamer.displayName} {...streamer} />
            ))}
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div
        className="w-screen h-full text-white flex flex-wrap gap-8 items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ["circInOut"] }}
          className="w-screen flex flex-col items-center justify-center text-white/60"
        >
          <p>
            <span className="bg-red-500 py-1 px-2 rounded-md text-white font-bold mr-2">
              LIVE
            </span>{" "}
            creators
          </p>
        </motion.div>
        {activeStreamers.map((streamer, index) => (
          <motion.div
            key={streamer.displayName}
            variants={itemVariants}
            custom={index}
          >
            <ActiveStreamer
              streamer={streamer}
              index={index}
              onSelect={handleSelectStreamer}
            />
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedStreamer && (
          <motion.div
            className="fixed inset-0 z-40 flex lg:flex-col items-center bg-black backdrop-blur-lg bg-opacity-50"
            onClick={handleCloseSelected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className=""
                onClick={(e) => e.stopPropagation()}
                layoutId={`streamer-${selectedStreamer.displayName}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 241, damping: 24 }}
              >
                <motion.img
                  src={selectedStreamer.profilePictureUrl}
                  alt={selectedStreamer.displayName}
                  className="h-96 lg:h-52 mt-24 aspect-square bg-white rounded-full overflow-hidden outline-8 outline-[#a088e2] outline outline-offset-4"
                />
              </motion.div>
            </div>
            <div className="w-full  h-full p-10 lg:p-4">
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
                className="bg-[#161616] flex flex-col gap-8 items-center justify-end lg:justify-start h-full w-full rounded-xl z-40 p-8 lg:p-4"
              >
                <div className="basis-1/4 w-full items-end lg:items-start flex flex-col">
                  <div className="w-full aspect-video rounded-xl bg-black overflow-hidden">
                    <iframe
                      src={
                        "https://player.twitch.tv/?channel=" +
                        selectedStreamer.displayName +
                        "&parent=smp.arens.live&parent=localhost&parent=arenslive.vercel.app"
                      }
                      height="100%"
                      width="100%"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="w-full mt-2">
                    <h1 className="text-3xl font-bold">
                      {selectedStreamer.displayName}
                      <div className="h-4 aspect-square ml-2 inline-block rounded-full bg-red-500"></div>
                    </h1>
                    <h1 className="text-white/60">
                      {selectedStreamer.description}
                    </h1>
                  </div>
                </div>
                <div className="basis-1/6 flex items-end p-2">
                  <Socials streamerId={selectedStreamer.displayName} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <motion.div
          initial="hidden"
          animate="show"
          className="mt-28 flex flex-col gap-4"
          transition={{
            staggerChildren: 0.2,
            delayChildren: 0.5,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ["circInOut"] }}
            className="w-screen flex flex-col gap-4 items-center justify-center text-white/60 mb-12"
          >
            <p>
              <span className="bg-gray-700 py-1 px-2 rounded-md text-white/80 font-bold mr-2">
                OFFLINE
              </span>{" "}
              creators
            </p>
          </motion.div>
          {nonActiveStreamers.map((streamer) => (
            <OfflineStreamer key={streamer.displayName} {...streamer} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Streamers;