"use client";

import React from "react";
import { motion } from "framer-motion";
import { type StreamerInfo } from "@/app/atoms/atoms";
import Image from "next/image";

const Creator: React.FC<StreamerInfo> = ({
  description,
  displayName,
  isLive,
  profilePictureUrl,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1}}
      transition={{ duration: 0.2, ease:[0, 0.71, 0.2, 1.01]}}
      className="max-w-[40rem] w-full bg-black/40 border border-white/20 rounded-3xl p-3 backdrop-blur-md z-30 overflow-hidden "
    >
      <a
        href={"https://twitch.tv/" + displayName}
        target="_blank"
        className="flex gap-4 items-center"
      >
        {profilePictureUrl && (
          <Image
            className="rounded-xl"
            src={profilePictureUrl}
            alt={displayName}
            height={100}
            width={100}
          />
        )}
        <h1 className="text-4xl lg:text-3xl text-white/80 font-bold">{displayName}</h1>
      </a>
    </motion.div>
  );
};

export default Creator;
