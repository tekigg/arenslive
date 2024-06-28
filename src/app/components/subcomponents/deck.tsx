"use client";
import { motion } from "framer-motion";
import { type StreamerInfo } from "@/app/atoms/atoms";

type streamerProps = {
  streamer: StreamerInfo;
  isSelected: boolean;
};

const Deck: React.FC<streamerProps> = ({ streamer, isSelected }) => {
    if (!isSelected) return null;
  return (
    <motion.div className="fixed inset-0 w-screen h-[50vh] p-10 z-30 top-[50vh] bg-gradient-to-t from-black/30 to-transparent">
      <div className="h-full w-full bg-black/30 backdrop-blur-md rounded-2xl "></div>
    </motion.div>
  );
};

export default Deck;
