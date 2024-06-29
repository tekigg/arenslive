import Image from "next/image";
import FireflyAnimation from "./components/fireflies";
import Logo from "./components/logo";
import LiveStreamers from "./components/getStreamers";

export default function Home() {
  return (
    <main className="">
      <div className="w-screen h-48 flex items-center justify-center">
        <Logo />
      </div>
      
      <LiveStreamers />

      <div className="fixed bg-gradient-to-t from-[#bbee6a18] to-transparent !h-[30vh] w-screen bottom-0  -z-10"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)'
        }}
      >
      <div className="fade-in-element fixed bg-black/10 !h-[30vh] w-screen bottom-0  z-10 backdrop-blur-md delay-100"></div>

        <FireflyAnimation />
      </div>
    </main>
  );
}
