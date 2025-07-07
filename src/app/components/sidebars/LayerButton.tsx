"use client";
import { useMutation } from "@liveblocks/react";
import React, { type ReactNode } from "react";

interface Props {
  layerID: string;
  text: string;
  icon: ReactNode;
  isSelected:boolean
}

const LayerButton = ({ layerID, text, icon, isSelected }: Props) => {
  const updateSelected = useMutation(({ setMyPresence }, layerId: string) => {
    setMyPresence({ selection: [layerId] }, { addToHistory: true });
  }, []);
  return (
    <button
      className={`flex items-center gap-2 rounded px-1.5 py-1 text-left text-[11px] hover:bg-gray-100 ${isSelected ? "bg-[#bceeff]" : ""} `}
      onClick={() => updateSelected(layerID)}
    >
      {icon}
      <span className="">{text}</span>
    </button>
  );
};

export default LayerButton;
