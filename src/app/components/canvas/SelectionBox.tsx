import { useSelf, useStorage } from "@liveblocks/react";
import React, { useEffect, useRef, useState } from "react";
import { LayerType } from "~/types";

const SelectionBox = () => {
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null,
  );

  const isShowingHandles = useStorage(
    (root) =>
      soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
  );

  const layers = useStorage((root) => root.layers);
  const layer = soleLayerId ? layers?.get(soleLayerId) : null;

  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const padding = 16;

  useEffect(() => {
    if (textRef.current) {
        const bbox = textRef.current.getBBox();
        setTextWidth(bbox.width)
    }
  }, [layer]);

  if (!layer) {
    return null;
  }

  return (
    <>
      <rect
        style={{ transform: `translate(${layer?.x}px, ${layer?.y}px)` }}
        className="pointer-events-none fill-transparent stroke-[#0b99ff] stroke-[1px]"
        width={layer?.width}
        height={layer?.height}
      />
      <rect
        className="fill-[#0b99ff]"
        x={layer.x + layer.width / 2 - (textWidth + padding) /2}
        y={layer.y + layer.height + 10}
        width={textWidth + padding}
        height={20}
        rx={4}
      />
      <text
        ref={textRef}
        style={{
          transform: `translate(${layer?.x + layer?.width / 2}px, ${layer?.y + layer.height + 25}px)`,
        }}
        textAnchor="middle"
        className="text[11px] pointer-events-none fill-white"
      >
        {Math.round(layer.width)} x {Math.round(layer.height)}
      </text>
    </>
  );
};

export default SelectionBox;
