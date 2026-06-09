"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { addRoomToScene } from "./addRoomToScene";

export function Room() {
  const { scene } = useThree();
  useEffect(() => {
    const cleanup = addRoomToScene(scene);
    return cleanup;
  }, [scene]);
  return null;
}
