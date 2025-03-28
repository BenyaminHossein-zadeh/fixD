import React from "react";
import { EllipseLayer } from "~/types";
import { colorToCss } from "~/utils";

interface Props {
  id: string;
  layer: EllipseLayer;
}

const Ellipse = ({ id, layer }: Props) => {
  const { x, y, width, height, fill, opacity, stroke } = layer;

  return (
    <g>
      <ellipse
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill={fill ? colorToCss(fill) : "#ccc"}
        stroke={stroke ? colorToCss(stroke) : "#ccc"}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        strokeWidth="1"
        opacity={`${opacity ?? 100}%`}
      />
    </g>
  );
};

export default Ellipse;
