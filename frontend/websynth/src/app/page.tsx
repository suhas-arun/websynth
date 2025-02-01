import InputPrompt from "@/components/InputPrompt";
import Canvas from "@/components/Canvas";

export default function Home() {
  return (
    <div className="justify-center items-center flex flex-col h-screen">
      <div className="w-full h-full">
        <Canvas />
      </div>
        <InputPrompt />
    </div>
  );
}
