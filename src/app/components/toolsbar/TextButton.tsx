import React from "react";
import IconButton from "./IconButton";
import { AiOutlineFontSize } from "react-icons/ai";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

const TextButton = ({ isActive, onClick }: Props) => {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <AiOutlineFontSize className="size-5" />
    </IconButton>
  );
};

export default TextButton;
