import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WebContainer } from '@webcontainer/api';

// Call only once
const webcontainerInstance = await WebContainer.boot();

export default function Home() {
  return (
    <div className="justify-center items-center flex flex-col h-screen">
      <p className="font-bold">Welcome to WebSynth</p>
      <Button>Get Started</Button>
      <Input placeholder="Enter your email" />
    </div>
  );
}
