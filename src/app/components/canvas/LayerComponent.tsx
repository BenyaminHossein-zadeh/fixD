import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import { LayerType } from "~/types";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Path from "./Path";
import { colorToCss } from "~/utils";
import Text from "./Text";

interface LayerComponentProps {
  id: string;
}

const LayerComponent = memo(({ id }: LayerComponentProps) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer} />;

    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer} />;

    case LayerType.Path:
      return (
        <Path
          points={layer.points}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#ccc"}
          stroke={layer.stroke ? colorToCss(layer.stroke) : "#ccc"}
          opacity={layer.opacity}
        />
      );
    case LayerType.Text:
      return <Text id={id} layer={layer} />;

    default:
      return null;
  }
});

LayerComponent.displayName = "LayerComponent";

export default LayerComponent;
