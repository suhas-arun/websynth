"use client";
import { useState } from "react";

const Canvas = () => {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedArea, setSelectedArea]
    = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
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
      console.log(selectedArea);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting) {
      setCurrentPos({ x: e.clientX, y: e.clientY });
    }
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
      border: "2px solid blue",
      backgroundColor: "rgba(0, 0, 255, 0.2)",
    };
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

    </div>
  );
};

export default Canvas;
