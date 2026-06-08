"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/lib/sound/SoundProvider";

/**
 * Fires a scene's recorded narration clip (if one exists) the moment the
 * visitor meaningfully enters that scene — once per visit, gated entirely
 * behind the visitor's own opt-in to sound.
 */
export function useActAudio(id: string, audioSrc: string | undefined, progress: number) {
  const { playNarration } = useSound();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (progress > 0.06) {
      firedRef.current = true;
      playNarration(id, audioSrc);
    }
  }, [progress, id, audioSrc, playNarration]);
}
