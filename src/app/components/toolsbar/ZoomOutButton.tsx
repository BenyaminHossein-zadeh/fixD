import React from "react";
import IconButton from "./IconButton";
import { AiOutlineZoomOut } from "react-icons/ai";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const ZoomOutButton = ({ onClick, disabled }: Props) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <AiOutlineZoomOut size={20} color="#888888" />
    </IconButton>
  );
};

export default ZoomOutButton;
