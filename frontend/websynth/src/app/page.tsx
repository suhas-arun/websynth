"use client";
import { useRef } from "react";
import InputPrompt from "@/components/InputPrompt";
import Canvas from "@/components/Canvas";
import WebsitePreview from "@/components/WebsitePreview";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="justify-center items-center flex flex-col h-screen"
      ref={pageRef}
    >
      <div className="w-full h-full">
        <Canvas />
        <WebsitePreview />
      </div>
        <InputPrompt homepageRef={pageRef} />
    </div>
  );
}
