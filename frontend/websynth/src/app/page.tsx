"use client";
import { useRef, useState } from "react";
import InputPrompt from "@/components/InputPrompt";
import Canvas from "@/components/Canvas";
import WebsitePreview from "@/components/WebsitePreview";

export default function Home() {
  // Dev mode => user can select components. Otherwise, they interact directly with the page
  const [devMode, setDevMode] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="justify-center items-center flex flex-col h-screen"
      ref={pageRef}
    >
      <div className="w-full h-full">
        <Canvas devMode={devMode} setDevMode={setDevMode} />
        <WebsitePreview devMode={devMode} />
      </div>
      <InputPrompt homepageRef={pageRef} />
    </div>
  );
}
