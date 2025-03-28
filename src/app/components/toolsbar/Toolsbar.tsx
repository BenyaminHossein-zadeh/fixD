import React from "react";
import { CanvasState } from "~/types";

interface Props {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
}

const Toolsbar = ({ canvasState, setCanvasState }: Props) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0.18)]">
        <div className="flex justify-center items-center gap-3">
            
        </div>
    </div>
  );
};

export default Toolsbar;
