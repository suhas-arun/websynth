"use client";
import { useRef, useState } from "react";
import InputPrompt from "@/components/InputPrompt";
import Canvas from "@/components/Canvas";
import WebsitePreview from "@/components/WebsitePreview";
import { Component } from "@/types/component";
import { Request } from "@/types/request";
import { sendRequestToBackend } from "@/utils/sendRequestToBackend";
import { BACKEND_ENDPOINT } from "./constants/globals";

export default function Home() {
  // Dev mode => user can select components. Otherwise, they interact directly with the page
  const [devMode, setDevMode] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>("/");
  const pageRef = useRef<HTMLDivElement>(null);

  // Stores components that have already been selected
  const [components, setComponents] = useState<Component[]>([]);

  // Send request to backend
  const handleSubmit = (prompt: string, screenshot: string) => {
    const request: Request = {
      prompt,
      screenshot,
      components,
    };
    console.log(request)
    const response = sendRequestToBackend(BACKEND_ENDPOINT, request);
    console.log(response);
  };

  return (
    <div
      className="justify-center items-center flex flex-col h-screen"
      ref={pageRef}
    >
      <div className="w-full h-full">
        <Canvas
          devMode={devMode}
          setDevMode={setDevMode}
          components={components}
          setComponents={setComponents}
          currentUrl={currentUrl}
        />
        <WebsitePreview devMode={devMode} setCurrentUrl={setCurrentUrl}/>
      </div>
      <InputPrompt homepageRef={pageRef} handleSubmit={handleSubmit} />
    </div>
  );
}
