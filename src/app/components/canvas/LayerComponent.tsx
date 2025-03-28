import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import { LayerType } from "~/types";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";

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

    default:
      return null;
  }
});

LayerComponent.displayName = "LayerComponent";

export default LayerComponent;
