"use client";

import Logo from "@/components/Logo";
import { MagneticButton } from "@/widget/animations/MagneticButton";
import { AudioLines, GithubIcon, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute left-0 w-[50%] h-screen bg-background"></div>
      <div className="absolute right-0 w-[50%] h-screen bg-muted"></div>
      <div className="z-20 flex justify-between">
        <div className="min-w-[40%] h-screen z-20">
          <div className="pl-12">
            <Logo />
          </div>
          <h2 className="text-6xl pl-24 mt-28 mb-36 leading-snug font-bold opacity-80">
            3legant <br /> Wave Sounds
          </h2>
          <div className="w-64 h-36 bg-muted flex items-center">
            <h5 className="text-muted-foreground text-xs ml-[100px] mr-[-100px]">
              <span className="font-semibold text-sm">
                Experience the Elegance of Sound
              </span>{" "}
              <br />
              We cover all of your favorite sound output devices for your
              desired sound quality.
            </h5>
          </div>
          <div className="mt-24 bg-primary rounded-r-2xl flex items-center gap-3 w-56 py-[2px]">
            <h6 className="ml-6">Made By Ashkan2077</h6>
            <GithubIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full h-screen flex flex-col items-center justify-center z-30">
          <AudioLines className="w-48 h-48 text-gray-400 mt-52" />
          <Link href="/home " className="  w-full h-12 mt-40">
            <MagneticButton className="w-full h-full text-muted-foreground hover:bg-gray-600 hover:opacity-60 bg-transparent hover:text-background dark:hover:text-foreground border-2 border-primary rounded-md ">
              Get Started
            </MagneticButton>
          </Link>
        </div>
        <div className="min-w-[40%] h-screen z-20">
          <div className="z-20">
            <h1 className="text-9xl ml-[-165px] text-background font-bold">
              3LEGANT WAVE SOUNDS
            </h1>
          </div>
          <div className="mt-24 z-20 bg-background w-64 h-36 ml-auto grid items-center">
            <div className="flex ml-[-100px] gap-3 items-center">
              <h6 className="text-sm font-semibold text-muted-foreground">
                Let&apos;s Go And Explore! &gt;&gt;&gt;
              </h6>
              <div className="w-10 h-10 bg-transparent border-primary border-[2px] rounded-full grid items-center justify-center ml-8">
                <Play className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
