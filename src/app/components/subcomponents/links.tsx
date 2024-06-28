import React from "react";
import Image from "next/image";
import { useQuery, QueryFunction } from "@tanstack/react-query";

interface Social {
    name: string;
    url: string;
    }

interface dataTypes {
    streamerId: string;
    socials: Social[];
}

const fetchLiveStreamers: QueryFunction<dataTypes, [string, string]> = async ({ queryKey }) => {
  const [_, streamerId] = queryKey;
  const res = await fetch("/api/streamer-links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ streamerIds: [streamerId] }),
  });
  if (!res.ok) throw new Error("Failed to fetch live streamers");
  return res.json();
};

const Socials: React.FC<{ streamerId: string }> = ({ streamerId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["streamerLinks", streamerId],
    queryFn: fetchLiveStreamers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return (
      <div className="opacity-40">
        <Image
          src="/assets/icons/loading.svg"
          alt="Loading"
          width={12}
          height={12}
        />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching streamer links:", error);
    return <div>Failed to load social links</div>;
  }

return (
    <div>
        {data[0]?.socials?.map((social, index) => (
            <a
                href={social.url}
                target="_blank"
                className="text-white/30 font-sans hover:text-white/100 transition-all"
            >
                {social.name}{index !== data[0]?.socials?.length - 1 && <span className="mx-1 text-white/50">•</span>}
            </a>
        ))}
    </div>
);
};

export default Socials;
