"use client";
import React, { useEffect, useRef, useState } from "react";
import { CanvasMode } from "~/types";
import IconButton from "./IconButton";
import { BiDownArrow, BiPointer, BiUpArrow } from "react-icons/bi";
import { RiHand } from "react-icons/ri";

interface Props {
  isActive: boolean;
  canvasMode: CanvasMode;
  onClick: (canvasMode: CanvasMode.None | CanvasMode.Dragging) => void;
}

const SelectionButton = ({ isActive, canvasMode, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (canvasMode: CanvasMode.None | CanvasMode.Dragging) => {
    onClick(canvasMode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex" ref={menuRef}>
      <IconButton isActive={isActive} onClick={() => onClick(CanvasMode.None)}>
        {canvasMode !== CanvasMode.None &&
          canvasMode !== CanvasMode.Dragging && (
            <BiPointer className="size-5" />
          )}
        {canvasMode === CanvasMode.None && <BiPointer className="size-5" />}
        {canvasMode === CanvasMode.Dragging && <RiHand className="size-5" />}
      </IconButton>
      <button onClick={() => setIsOpen(!isOpen)} className="ml-1">
        <BiUpArrow className="size-2" />
      </button>
      {isOpen && (
        <div className="absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg">
          <button
            className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasMode === CanvasMode.None ? "bg-blue-500" : ""}`}
            onClick={() => handleClick(CanvasMode.None)}
          >
            <span className="w-5 text-xs">
              {canvasMode === CanvasMode.None && "✓"}
            </span>
            <BiPointer className="mr-2 size-4" />
            <span className="text-xs">Move</span>
          </button>
          <button
            className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasMode === CanvasMode.Dragging ? "bg-blue-500" : ""}`}
            onClick={() => handleClick(CanvasMode.Dragging)}
          >
            <span className="w-5 text-xs">
              {canvasMode === CanvasMode.Dragging && "✓"}
            </span>
            <RiHand className="mr-2 size-4" />
            <span className="text-xs">Hand tool</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectionButton;
