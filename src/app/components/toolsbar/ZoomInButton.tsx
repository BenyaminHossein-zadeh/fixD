import React from "react";
import IconButton from "./IconButton";
import { AiOutlineZoomIn } from "react-icons/ai";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const ZoomInButton = ({ onClick, disabled }: Props) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <AiOutlineZoomIn size={20} color="#888888" />
    </IconButton>
  );
};

export default ZoomInButton;
