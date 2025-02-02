"use client";

import { useEffect, useState } from "react";

interface WebsitePreviewProps {
  devMode: boolean;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  setCurrentUrl: (url: string) => void;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ devMode, iframeRef, setCurrentUrl }) => {

  // Minimal Event Listener to track the URL inside WebContainer
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "page-change") {
        setCurrentUrl(event.data.url);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={`absolute h-full w-full top-0 left-0 z-0 pointer-events-${devMode ? "none" : "auto"}`}>
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        title="Website Preview"
      />
    </div>
  );
};

export default WebsitePreview;
