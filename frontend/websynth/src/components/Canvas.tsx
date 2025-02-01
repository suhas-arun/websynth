"use client";
import { useState, useEffect } from "react";
import Sidesheet from "./Sidesheet";
import ComponentTag from "./ComponentTag";

const Canvas = () => {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedArea, setSelectedArea]
    = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [sidesheetOpen, setSidesheetOpen] = useState(false);

  // Stores components that have already been selected
  const [components, setComponents] = useState<
    { x: number; y: number; width: number; height: number, name: string, description: string }[]
  >([]);

  // Handle Escape key to clear selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArea(null);
        setIsSelecting(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (sidesheetOpen) return;
    if (!isSelecting) {
      setSelectedArea(null);
      // Start selecting: Record the initial position
      setStartPos({ x: e.clientX, y: e.clientY });
      setCurrentPos({ x: e.clientX, y: e.clientY });
      setIsSelecting(true);
    } else {
      // End selecting: Finalise the selection
      setCurrentPos({ x: e.clientX, y: e.clientY });
      setIsSelecting(false);
      setSelectedArea({
        x: Math.min(startPos!.x, currentPos!.x),
        y: Math.min(startPos!.y, currentPos!.y),
        width: Math.abs(currentPos!.x - startPos!.x),
        height: Math.abs(currentPos!.y - startPos!.y),
      });
      setSidesheetOpen(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting) {
      setCurrentPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleComponentSubmit = (name: string, description: string) => {
    if (!selectedArea) return;
    setComponents([
      ...components,
      { ...selectedArea, name, description },
    ]);
    setSelectedArea(null);
    setSidesheetOpen(false);
  };

  const getRectangleStyle = (
    rectangle: { x: number, y: number, width: number, height: number }
  ): React.CSSProperties => {
    return {
      position: "absolute",
      left: rectangle.x,
      top: rectangle.y,
      width: rectangle.width,
      height: rectangle.height,
      border: "2px solid black",
      backgroundColor: "rgba(50, 50, 50, 0.2)",
    };
  };

  const getComponentElement = (
    component: { x: number; y: number; width: number; height: number, name: string, description: string }
  ) => {
    return (
      <div
        key={component.name}
        style={{
          position: "absolute",
          left: component.x,
          top: component.y,
          width: component.width,
          height: component.height,
          border: "2px solid green",
        }}
        className="flex flex-col justify-center items-center"
      >
        <ComponentTag name={component.name} description={component.description} />
      </div>
    );
  };


  return (
    <div
      className="w-full h-screen bg-white"
      onClick={handleClick} // Use click event to toggle selection
      onMouseMove={handleMouseMove}
    >
      {/* Display area while selecting */}
      {isSelecting && startPos && currentPos &&
        <div style={getRectangleStyle({
          x: Math.min(startPos.x, currentPos.x),
          y: Math.min(startPos.y, currentPos.y),
          width: Math.abs(currentPos.x - startPos.x),
          height: Math.abs(currentPos.y - startPos.y),
        })} />
      }

      {/* Display selected area */}
      {selectedArea &&
        <div style={getRectangleStyle(selectedArea)} />
      }

      {/* Display sidesheet */}
      <Sidesheet
        open={sidesheetOpen}
        onOpenChange={setSidesheetOpen}
        onComponentSubmit={handleComponentSubmit}
      />

      {/* Display selected components */}
      {components.map((component, i) => getComponentElement(component))}
    </div>
  );
};

export default Canvas;
