'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { type StreamerInfo } from '@/app/atoms/atoms';
import Deck from './deck';

type streamerProps = {
  streamer: StreamerInfo;
  index: number;
  onSelect?: (streamer: StreamerInfo) => void;
};

const ActiveStreamer: React.FC<streamerProps> = ({ streamer, index, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(streamer);
    }
  };

  return (
    <div onClick={handleClick}>
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.03, transition: { duration: 0.1, ease: "easeInOut" } }}
        whileTap={{ scale: 1 }}
        animate={{
          scale: 1,
          y: [0, -20, 0],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          scale: {
            duration: 0.15,
            ease: "easeInOut",
          },
          y: {
            repeat: Infinity,
            duration: 4 + index * 0.5,
            ease: "easeInOut",
          },
          rotateZ: {
            repeat: Infinity,
            duration: 6 + index * 0.7,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div 
          layoutId={`streamer-${streamer.displayName}`} 
          className='h-44 aspect-square bg-white rounded-full overflow-hidden outline-4 outline-[#a088e2] outline outline-offset-4'
        >
          <img src={streamer.profilePictureUrl} alt={streamer.displayName} />
        </motion.div>
        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-black text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {streamer.displayName}
        </div>
        <div className="absolute font-bold font-sans text-2xl left-1/2 -bottom-3  -translate-x-1/2 bg-[#eb0400] text-white py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          LIVE
        </div>
      </motion.div>
      <Deck streamer={streamer} isSelected={false} />
    </div>
  );
};

export default ActiveStreamer;