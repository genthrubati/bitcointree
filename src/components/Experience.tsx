"use client";

/**
 * Experience
 * ----------
 * The film, assembled. Seven acts plus a prologue, each a full-viewport
 * scene controlled by the visitor's scroll, followed by the calm landing
 * place where the documentary hands off to something the visitor can
 * simply stay within.
 *
 * Provider order matters: smooth-scroll must wrap everything that reads
 * scroll position; sound must wrap everything that may want to speak.
 */

import { SmoothScrollProvider } from "@/lib/scroll/SmoothScrollProvider";
import { SoundProvider } from "@/lib/sound/SoundProvider";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { BrandHeader } from "@/components/ui/BrandHeader";
import { Prologue } from "@/components/scenes/Prologue";
import { SceneSeed } from "@/components/scenes/SceneSeed";
import { SceneGrowth } from "@/components/scenes/SceneGrowth";
import { SceneCivilization } from "@/components/scenes/SceneCivilization";
import { SceneDecay } from "@/components/scenes/SceneDecay";
import { SceneBitcoin } from "@/components/scenes/SceneBitcoin";
import { Manifesto } from "@/components/scenes/Manifesto";
import { SceneHope } from "@/components/scenes/SceneHope";
import { SceneTree } from "@/components/scenes/SceneTree";
import { Contribution } from "@/components/scenes/Contribution";

export function Experience() {
  return (
    <SoundProvider>
      <SmoothScrollProvider>
        <SoundToggle className="top-5 right-5 sm:top-7 sm:right-7" />
        <ProgressRail />
        <BrandHeader />

        <main>
          <Prologue />
          <SceneSeed />
          <SceneGrowth />
          <SceneCivilization />
          <SceneDecay />
          <SceneBitcoin />
          <Manifesto />
          <SceneHope />
          <SceneTree />
          <Contribution />
        </main>
      </SmoothScrollProvider>
    </SoundProvider>
  );
}
