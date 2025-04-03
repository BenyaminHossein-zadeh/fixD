import { useMutation } from "@liveblocks/react";
import React, { useEffect, useRef, useState } from "react";
import { EllipseLayer, TextLayer } from "~/types";
import { colorToCss } from "~/utils";

interface Props {
  id: string;
  layer: TextLayer;
}

const Text = ({ id, layer }: Props) => {
  const {
    x,
    y,
    width,
    height,
    text,
    fontFamily,
    fontSize,
    fontWeight,
    fill,
    opacity,
    stroke,
  } = layer;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateText = useMutation(
    ({ storage }, newText: string) => {
      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update({ text: newText });
      }
    },
    [id],
  );

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
    updateText(inputValue);
  };
  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      updateText(inputValue);
    }
  };

  return (
    <g onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <foreignObject x={x} y={y} width={width} height={height}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            style={{
              fontSize: `${fontSize}px`,
              color: colorToCss(fill),
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleOnKeyDown}
          />
        </foreignObject>
      ) : (
        <text
          x={x}
          y={y + fontSize}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          fill={colorToCss(fill)}
          stroke={colorToCss(stroke)}
          opacity={`${opacity}%`}
        >
          {text}
        </text>
      )}
    </g>
  );
};

export default Text;
