import { useSelf, useStorage } from "@liveblocks/react";
import React, { useEffect, useRef, useState } from "react";
import { LayerType, Side, XYWH } from "~/types";

interface Props {
  onResizeHandlePointerDown: (corner: Side, initialBuild: XYWH) => void;
}

const handleWidth = 8;

const SelectionBox = ({ onResizeHandlePointerDown }: Props) => {
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
      setTextWidth(bbox.width);
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
        x={layer.x + layer.width / 2 - (textWidth + padding) / 2}
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
      {isShowingHandles && (
        <>
          <rect
            style={{
              cursor: "nwse-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, layer);
            }}
          />
          <rect
            style={{
              cursor: "ns-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x + layer.width / 2 - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top, layer);
            }}
          />
          <rect
            style={{
              cursor: "ne-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Right, layer);
            }}
          />
          <rect
            style={{
              cursor: "ew-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y + layer.height / 2 - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Left, layer);
            }}
          />
          <rect
            style={{
              cursor: "nesw-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Left, layer);
            }}
          />

          <rect
            style={{
              cursor: "ew-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y + layer.height / 2 - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, layer);
            }}
          />
          <rect
            style={{
              cursor: "nwse-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Right, layer);
            }}
          />
          <rect
            style={{
              cursor: "ns-resize",
              width: `${handleWidth}px`,
              height: `${handleWidth}px`,
              transform: `translate(${layer.x + layer.width / 2 - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
            }}
            className="fill-white stroke-[#0b99ff] stroke-[1px]"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom, layer);
            }}
          />
        </>
      )}
    </>
  );
};

export default SelectionBox;
