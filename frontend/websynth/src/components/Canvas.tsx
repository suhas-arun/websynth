"use client";
import { useState, useEffect } from "react";
import Sidesheet from "./Sidesheet";
import ComponentTag from "./ComponentTag";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const Canvas = () => {
  // Dev mode => user can select components. Otherwise, they interact directly with the page
  const [devMode, setDevMode] = useState(false);

  // Selection state
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedArea, setSelectedArea]
    = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Sidesheet state
  const [sidesheetOpen, setSidesheetOpen] = useState(false);

  // Stores components that have already been selected
  const [components, setComponents] = useState<
    { x: number, y: number, width: number, height: number, name: string, description: string }[]
  >([]);

  // Currently selected component
  const [selectedComponent, setSelectedComponent] = useState<{ index: number, name: string, description: string } | null>(null);

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
    if (sidesheetOpen || !devMode) return;
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

  const handleComponentClick = (index: number, name: string, description: string) => () => {
    if (!devMode) return;
    setIsSelecting(false);
    setSelectedComponent({ index, name, description });
    const component = components[index];
    setSelectedArea({ ...component });
    setSidesheetOpen(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting && devMode) {
      setCurrentPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleComponentSubmit = (name: string, description: string) => {
    if (!selectedArea) return;
    if (selectedComponent) {
      // Edit existing component if selected
      const updatedComponents = [...components];
      updatedComponents[selectedComponent.index!] = { ...selectedArea, name, description };
      setComponents(updatedComponents);
      setSelectedComponent(null);
      setSidesheetOpen(false);
    } else {
      // Add new component
      setComponents([
        ...components,
        { ...selectedArea, name, description },
      ]);
      setSelectedArea(null);
      setSidesheetOpen(false);
    }
  };

  const handleComponentDelete = (index: number) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    setComponents(updatedComponents);
    setSelectedComponent(null);
    setSelectedArea(null);
    setSidesheetOpen(false);
  }

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
    component: { x: number; y: number; width: number; height: number, name: string, description: string },
    index: number
  ) => {
    return (
      <div
        key={index}
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
        <ComponentTag
          name={component.name}
          description={component.description}
          onClick={handleComponentClick(index, component.name, component.description)}
        />
      </div>
    );
  };

  const toggleDevMode = (checked: boolean) => {
    if (!checked) {
      setIsSelecting(false);
      setStartPos(null);
      setCurrentPos(null);
      setSelectedArea(null);
      setSelectedComponent(null);
      setDevMode(checked);
    } else {
      setTimeout(() => {
        setDevMode(checked);
        setIsSelecting(false);
      }, 100);
    }
  }

  return (
    <div
      className="w-full h-screen bg-opacity-0"
      onClick={handleClick} // Use click event to toggle selection
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="flex items-center gap-2 border-solid border-gray-800 border-2 rounded-md p-2">
          <Switch
            id="dev-mode"
            checked={devMode}
            onCheckedChange={(checked) => toggleDevMode(checked)}
          />
          <Label htmlFor="dev-mode">Dev Mode</Label>
        </div>
      </div>


      {/* Display area while selecting */}
      {devMode && isSelecting && startPos && currentPos &&
        <div style={getRectangleStyle({
          x: Math.min(startPos.x, currentPos.x),
          y: Math.min(startPos.y, currentPos.y),
          width: Math.abs(currentPos.x - startPos.x),
          height: Math.abs(currentPos.y - startPos.y),
        })} />
      }

      {/* Display selected area */}
      {devMode && selectedArea &&
        <div style={getRectangleStyle(selectedArea)} />
      }

      {/* Display sidesheet */}
      <Sidesheet
        open={sidesheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedArea(null);
            setSelectedComponent(null);
          }
          setSidesheetOpen(open);
        }}
        onComponentSubmit={handleComponentSubmit}
        onComponentDelete={handleComponentDelete}
        selectedComponent={selectedComponent}
      />

      {/* Display selected components */}
      {devMode && components.map((component, i) => getComponentElement(component, i))}
    </div>
  );
};

export default Canvas;
