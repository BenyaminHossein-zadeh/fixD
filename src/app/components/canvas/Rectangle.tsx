import React from "react";
import { RectangleLayer } from "~/types";
import { colorToCss } from "~/utils";

interface Props {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
}

const Rectangle = ({ id, layer, onPointerDown }: Props) => {
  const { x, y, width, height, fill, opacity, stroke, cornerRadius } = layer;

  return (
    <g className="group">
      {/* hover border */}
      <rect
        style={{ transform: `translate(${x}px, ${y}px)` }}
        width={width}
        height={height}
        fill="none"
        stroke="#0b99ff"
        strokeWidth="4"
        className="pointer-events-none opacity-0 group-hover:opacity-100"
      />

      {/* main  rectangle */}
      <rect
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{ transform: `translate(${x}px, ${y}px)` }}
        width={width}
        height={height}
        fill={fill ? colorToCss(fill) : "#ccc"}
        strokeWidth={1}
        stroke={stroke ? colorToCss(stroke) : "#ccc"}
        opacity={`${opacity ?? 100}%`}
        rx={cornerRadius ?? 0}
        ry={cornerRadius ?? 0}
      />
    </g>
  );
};

export default Rectangle;
