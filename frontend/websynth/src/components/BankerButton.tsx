import React from "react";
import { PencilRuler } from "lucide-react"


const DotExpandButton = () => {
  return (
    <section className="grid place-content-center mb-4">
      <div className="group flex h-14 items-center gap-1 rounded-full bg-neutral-200 pl-4 pr-5 transition-all duration-200 ease-in-out hover:bg-black hover:pl-4 hover:text-white active:bg-neutral-700">
        <span className="rounded-full bg-neutral-200 p-1 transition-colors duration-200 group-hover:bg-black">
          <PencilRuler size={36} />
        </span>
        <span className="font-bold text-xl">Build with WebSynth.ai</span>
      </div>
    </section>
  );
};

export default DotExpandButton;