import React from "react";
import IconButton from "./IconButton";
import { BiPencil } from "react-icons/bi";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

const PencilButton = ({ isActive, onClick }: Props) => {
  return (<IconButton isActive={isActive} onClick={onClick}>
    <BiPencil />
  </IconButton>);
};

export default PencilButton;
