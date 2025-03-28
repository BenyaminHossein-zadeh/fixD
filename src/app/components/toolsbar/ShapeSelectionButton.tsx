import React, { useEffect, useRef, useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { IoEllipseOutline, IoSquareOutline } from "react-icons/io5";
import { CanvasMode, CanvasState, LayerType } from "~/types";
import IconButton from "./IconButton";

interface Props {
  isActive: boolean;
  canvasState: CanvasState;
  onClick: (layerType: LayerType.Rectangle | LayerType.Ellipse) => void;
}

const ShapeSelectionButton = ({ isActive, canvasState, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (layerType: LayerType.Rectangle | LayerType.Ellipse) => {
    onClick(layerType);
    setIsOpen(false);
  };

  return (
    <div className="relative flex" ref={menuRef}>
      <IconButton
        isActive={isActive}
        onClick={() => onClick(LayerType.Rectangle)}
      >
        {canvasState.mode !== CanvasMode.Inserting && (
          <IoSquareOutline className="size-5" />
        )}
        {canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Rectangle && (
            <IoSquareOutline className="size-5" />
          )}
        {canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Ellipse && (
            <IoEllipseOutline className="size-5" />
          )}
      </IconButton>
      <button onClick={() => setIsOpen(!isOpen)} className="ml-1">
        <BiUpArrow className="size-2" />
      </button>

      {isOpen && (
        <div className="absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg">
          <button
            className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle ? "bg-blue-500" : ""}`}
            onClick={() => handleClick(LayerType.Rectangle)}
          >
            <span className="w-5 text-xs">
              {canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Rectangle &&
                "✓"}
            </span>
            <IoSquareOutline className="mr-2 size-4" />
            <span className="text-xs">Rectangle</span>
          </button>
          <button
            className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse ? "bg-blue-500" : ""}`}
            onClick={() => handleClick(LayerType.Ellipse)}
          >
            <span className="w-5 text-xs">
              {canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Ellipse &&
                "✓"}
            </span>
            <IoEllipseOutline className="mr-2 size-4" />
            <span className="text-xs">Ellipse</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShapeSelectionButton;
