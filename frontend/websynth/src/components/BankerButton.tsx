import React from "react";
import { MessageCircle } from "lucide-react"

const DotExpandButton = () => {
  return (
    <section className="grid place-content-center mb-4">
      <div className="group flex h-10 items-center gap-1 rounded-full bg-neutral-200 pl-4 pr-4 transition-all duration-200 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700">
        <span className="rounded-full bg-neutral-200 p-1 text-md transition-colors duration-200 group-hover:bg-black">
          <MessageCircle size={24} />
        </span>
        <span className="font-bold">Ask WebSynth.ai</span>
      </div>
    </section>
  );
};

export default DotExpandButton;