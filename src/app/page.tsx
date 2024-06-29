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
      <FireflyAnimation />
    </main>
  );
}
