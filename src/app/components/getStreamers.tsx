"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Streamers from "./streamers";
import Image from "next/image";

const fetchLiveStreamers = async () => {
  const res = await fetch("/api/live-streamers");
  if (!res.ok) throw new Error("Failed to fetch live streamers");
  return res.json();
};

export default function LiveStreamers() {

  const { data, error, isLoading } = useQuery({
    queryKey: ["liveStreamers"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    queryFn: fetchLiveStreamers,
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen fixed top-0 bottom-0 flex items-center justify-center">
        <motion.div
        initial={{ scale: 0.8, opacity: 0}}
        animate={{ scale: 1, opacity: 1}}
        exit={{ scale: 0.8, opacity: 0}}
        >
          <Image
            src={"/assets/icons/loading.svg"}
            alt="Loading"
            width={50}
            height={50}
          ></Image>
        </motion.div>
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-screen h-80 mt-12">
      <Streamers streamers={data} />
    </div>
  );
}
