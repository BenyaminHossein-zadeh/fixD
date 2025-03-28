import React from "react";
import { RectangleLayer } from "~/types";
import { colorToCss } from "~/utils";

interface Props {
  id: string;
  layer: RectangleLayer;
}

const Rectangle = ({ id, layer }: Props) => {
  const { x, y, width, height, fill, opacity, stroke, cornerRadius } = layer;

  return (
    <g>
      <rect
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
