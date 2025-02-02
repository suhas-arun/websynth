
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Code, Eye } from "lucide-react";

interface DevSidebarProps {
  devMode: boolean;
  toggleDevMode: (devMode: boolean) => void;
}

const DevSidebar: React.FC<DevSidebarProps> = ({ devMode, toggleDevMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-5 left-5 z-50">
      {/* Floating Icon to Open Sidebar */}
      <Button
        variant="ghost"
        className={cn(
          "p-3 rounded-full text-white hover:bg-gray-700 shadow-lg transition-all flex items-center gap-2",
          devMode ? "bg-purple-600 animate-pulse" : "bg-gray-800"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {devMode ? <Code size={20} /> : <Eye size={20} />}
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar Menu */}
      <div
        className={cn(
          "absolute top-12 left-0 w-48 bg-white shadow-xl rounded-lg p-4 space-y-3 transition-all",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Dev Mode</span>
          <Switch checked={devMode} onCheckedChange={toggleDevMode} />
        </div>

        {devMode && (
          <div className="space-y-2">
            <Button className="w-full">Dev Tool 1</Button>
            <Button className="w-full">Dev Tool 2</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DevSidebar;