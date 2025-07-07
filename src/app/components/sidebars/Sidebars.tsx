"use client";

import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { RiSideBarLine } from "react-icons/ri";
import { hexToRGB } from "~/utils";
import { LayerType } from "~/types";
import {
  IoEllipseOutline,
  IoPencilOutline,
  IoSquareOutline,
} from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import LayerButton from "./LayerButton";

interface SidebarsPropsType {
  leftIsMinimized: boolean;
  setLeftIsMinimized: (val: boolean) => void;
}

const Sidebars: React.FC<SidebarsPropsType> = ({
  leftIsMinimized,
  setLeftIsMinimized,
}) => {
  const me = useSelf();

  const others = useOthers();

  const selectedLayer = useSelf((me) => {
    const selection = me.presence.selection;
    return selection.length === 1 ? selection[0] : null;
  });

  const layer = useStorage((root) => {
    if (!selectedLayer) {
      return null;
    }

    return root.layers.get(selectedLayer);
  });

  const roomColor = useStorage((root) => root.roomColor);

  const layers = useStorage((root) => root.layers);
  const layerIds = useStorage((root) => root.layerIds);
  const reversedLayerIds = [...(layerIds ?? [])].reverse();
  const selection = useSelf((me) => me.presence.selection);

  const updateLayer = useMutation(
    (
      { storage },
      updates: {
        x?: number;
        y?: number;
        widht?: number;
        height?: number;
        opacity?: number;
        cornerRadius?: number;
        fill?: string;
        stroke?: string;
        fontSize?: number;
        fontWeight?: string;
        fontFamily?: string;
      },
    ) => {
      if (!selectedLayer) {
        return null;
      }

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(selectedLayer);

      if (layer) {
        layer.update({
          ...(updates.x !== undefined && { x: updates.x }),
          ...(updates.y !== undefined && { y: updates.y }),
          ...(updates.widht !== undefined && { widht: updates.widht }),
          ...(updates.height !== undefined && { height: updates.height }),
          ...(updates.opacity !== undefined && { opacity: updates.opacity }),
          ...(updates.cornerRadius !== undefined && {
            cornerRadius: updates.cornerRadius,
          }),
          ...(updates.fill !== undefined && { fill: hexToRGB(updates.fill) }),
          ...(updates.stroke !== undefined && {
            stroke: hexToRGB(updates.stroke),
          }),
          ...(updates.fontSize !== undefined && { fontSize: updates.fontSize }),
          ...(updates.fontWeight !== undefined && {
            fontWeight: updates.fontWeight,
          }),
          ...(updates.fontFamily !== undefined && {
            fontFamily: updates.fontFamily,
          }),
        });
      }
    },
    [selectedLayer],
  );

  return (
    <>
      {/* left sidebar */}
      {!leftIsMinimized ? (
        <div className="fixed left-0 flex h-screen w-[240px] flex-col border-r border-e-gray-200 bg-white">
          <div className="p-4">
            <div className="flex justify-between">
              <Link href="/dashboard">
                <Image
                  src="/fixd_logo.svg"
                  alt="Fixd Logo"
                  width={18}
                  height={18}
                  className="size-[18px]"
                  priority
                />
              </Link>
              <RiSideBarLine
                onClick={() => setLeftIsMinimized(true)}
                className="size-5 cursor-pointer"
              />
            </div>
            <h2 className="mt-2 scroll-m-20 text-[13px] font-medium">
              Roomname
            </h2>
          </div>
          <div className="border-b border-gray-200" />
          <div className="flex flex-col gap-1 p-4">
            <span className="mb-2 text-[11px] font-medium">Layers</span>
            {layerIds &&
              reversedLayerIds?.map((id) => {
                const layer = layers?.get(id);
                const isSelected = selection?.includes(id);
                switch (layer?.type) {
                  case LayerType.Rectangle:
                    return (
                      <LayerButton
                        key={id}
                        isSelected={isSelected ?? false}
                        layerID={id}
                        text="Rectangle"
                        icon={
                          <IoSquareOutline className="size-3 text-gray-500" />
                        }
                      />
                    );

                  case LayerType.Ellipse:
                    return (
                      <LayerButton
                        key={id}
                        isSelected={isSelected ?? false}
                        layerID={id}
                        text="Ellipse"
                        icon={
                          <IoEllipseOutline className="size-3 text-gray-500" />
                        }
                      />
                    );
                  case LayerType.Path:
                    return (
                      <LayerButton
                        key={id}
                        isSelected={isSelected ?? false}
                        layerID={id}
                        text="Drawing"
                        icon={
                          <IoPencilOutline className="size-3 text-gray-500" />
                        }
                      />
                    );
                  case LayerType.Text:
                    return (
                      <LayerButton
                        key={id}
                        isSelected={isSelected ?? false}
                        layerID={id}
                        text="Text"
                        icon={
                          <AiOutlineFontSize className="size-3 text-gray-500" />
                        }
                      />
                    );

                  default:
                    break;
                }
              })}
          </div>
        </div>
      ) : (
        <div className="fixed left-3 top-3 flex h-[48px] w-[250px] items-center justify-between rounded-xl border bg-white p-4">
          <Link href="/dashboard">
            <Image
              src="/fixd_logo.svg"
              alt="Fixd Logo"
              width={18}
              height={18}
              className="size-[18px]"
              priority
            />
          </Link>
          <h2 className="scroll-m-20 text-[13px] font-medium">Roomname</h2>
          <RiSideBarLine
            onClick={() => setLeftIsMinimized(false)}
            className="size-5 cursor-pointer"
          />
        </div>
      )}

      {/* right sidebar */}
      {!leftIsMinimized || layer ? (
        <div
          className={`fixed ${leftIsMinimized && layer ? "bottom-3 right-3 top-3 rounded-xl" : ""} ${!leftIsMinimized && !layer ? "h-screen" : ""} ${!leftIsMinimized && layer ? "bottom-0 right-0 top-0 h-screen" : ""} right-0 flex w-[240px] flex-col border-l border-gray-200 bg-white`}
        ></div>
      ) : (
        <div className=""></div>
      )}
    </>
  );
};

export default Sidebars;