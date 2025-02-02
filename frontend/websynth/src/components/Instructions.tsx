import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image";
import { useState } from "react";

const Instructions = () => {
  const [open, setOpen] = useState(true);


  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <Image src="/websynth.png" width={80} height={60} alt="WebSynth logo" />
            Start Building with WebSynth.ai
          </DialogTitle>
          <DialogDescription className="text-md flex flex-col">
            <span className="mb-4">WebSynth is an AI-powered website builder that transforms your sketches into stunning websites! 🎨
            </span>

            <span className="mb-4">Start by selecting "Dev Mode" and drawing regions on the canvas. Add labels and descriptions, and WebSynth will bring your vision to life!
            </span>

            <span className="mb-4">✨ Click the button at the bottom to describe your project, and watch WebSynth work its magic. Keep tweaking by selecting regions or uploading your own files for even more control.
            </span>

            Your masterpiece is just a few clicks away—let’s capture creativity! 🚀
          </DialogDescription>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
};

export default Instructions;
