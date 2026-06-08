"use client";

/**
 * SoundToggle
 * -----------
 * A minimal, single glyph in the corner of the frame — presented once,
 * gently, never insisted upon. Sound defaults to off; this is the only
 * way to turn it on, and the choice is remembered.
 */

import { useSound } from "@/lib/sound/SoundProvider";
import { cn } from "@/lib/utils";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound and narration" : "Enable ambient sound and narration"}
      className={cn(
        "group fixed z-50 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper/70 backdrop-blur-sm transition-colors duration-500 hover:border-ink/25",
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="text-ink-soft transition-colors duration-300 group-hover:text-ink"
        aria-hidden
      >
        <path
          d="M3 9.5v5h3.6L12 19V5L6.6 9.5H3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        {enabled ? (
          <path
            d="M16 8.5c1.2 1 1.9 2.2 1.9 3.5s-.7 2.5-1.9 3.5M18.4 6c1.9 1.6 3 3.7 3 6s-1.1 4.4-3 6"
            stroke="var(--color-ember)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M16 9.5l4.5 5M20.5 9.5 16 14.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
