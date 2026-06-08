/**
 * Narration script — the spine of the experience.
 *
 * Each act's narration is broken into short phrases ("subtitle cards"),
 * each owning a [start, end] window of that act's *local* scroll progress
 * (0 → 1). The <Narration> component cross-fades between the active
 * phrases as the visitor scrolls — exactly like film subtitles, never
 * stacking, always brief, with silence (empty space) between thoughts.
 *
 * `audio` is an optional path to a recorded narration clip for the act.
 * Drop files at /public/audio/narration/{id}.mp3 to enable spoken
 * narration; the experience is 100% complete without them — narration
 * defaults to on-screen subtitles, which is how most visitors will
 * experience it (sound is muted by default, by design).
 */

export interface NarrationPhrase {
  text: string;
  start: number;
  end: number;
}

export interface ActScript {
  id: string;
  index: number | null; // null for prologue
  title: string;
  audio?: string;
  phrases: NarrationPhrase[];
}

export const NARRATION: ActScript[] = [
  {
    id: "prologue",
    index: null,
    title: "Arrival",
    audio: "/audio/narration/prologue.mp3",
    phrases: [
      { text: "This is a story about things that take time.", start: 0.05, end: 0.55 },
      { text: "Scroll, slowly, to begin.", start: 0.55, end: 1 },
    ],
  },
  {
    id: "seed",
    index: 1,
    title: "Seed",
    audio: "/audio/narration/seed.mp3",
    phrases: [
      { text: "Every forest was once a single seed.", start: 0.05, end: 0.38 },
      { text: "Every fortune, a single decision.", start: 0.38, end: 0.68 },
      { text: "Every trust, a single promise — kept.", start: 0.68, end: 1 },
    ],
  },
  {
    id: "growth",
    index: 2,
    title: "Growth",
    audio: "/audio/narration/growth.mp3",
    phrases: [
      { text: "Nothing about growth can be rushed.", start: 0.05, end: 0.45 },
      {
        text: "It happens in the dark, underground, for far longer than it ever happens in the light.",
        start: 0.45,
        end: 1,
      },
    ],
  },
  {
    id: "civilization",
    index: 3,
    title: "Civilization",
    audio: "/audio/narration/civilization.mp3",
    phrases: [
      { text: "With trust, we built everything.", start: 0.05, end: 0.3 },
      { text: "Cities. Trade. Language. Law.", start: 0.3, end: 0.55 },
      {
        text: "Every one of them, a promise that someone, somewhere, would keep their word —",
        start: 0.55,
        end: 0.8,
      },
      { text: "and that the next person would too.", start: 0.8, end: 1 },
    ],
  },
  {
    id: "decay",
    index: 4,
    title: "Monetary Decay",
    audio: "/audio/narration/decay.mp3",
    phrases: [
      { text: "But somewhere along the way, the promise changed.", start: 0.06, end: 0.34 },
      {
        text: "The thing we agreed to trust could be quietly, endlessly, created out of nothing.",
        start: 0.34,
        end: 0.7,
      },
      { text: "A little less, every year, for everyone who had saved.", start: 0.7, end: 1 },
    ],
  },
  {
    id: "bitcoin",
    index: 5,
    title: "Bitcoin",
    audio: "/audio/narration/bitcoin.mp3",
    phrases: [
      { text: "Then, someone planted something different.", start: 0.06, end: 0.32 },
      { text: "A promise that could not be quietly changed.", start: 0.32, end: 0.56 },
      {
        text: "Not by a government. Not by a company. Not by anyone — including its creator.",
        start: 0.56,
        end: 0.82,
      },
      { text: "Just rules, written down, and kept by everyone, for everyone.", start: 0.82, end: 1 },
    ],
  },
  {
    id: "hope",
    index: 6,
    title: "Hope",
    audio: "/audio/narration/hope.mp3",
    phrases: [
      { text: "You don't have to understand all of it to be part of it.", start: 0.08, end: 0.42 },
      {
        text: "You only have to plant something, and let time do what time does.",
        start: 0.42,
        end: 0.78,
      },
      { text: "That's all a seed has ever needed from anyone.", start: 0.78, end: 1 },
    ],
  },
  {
    id: "tree",
    index: 7,
    title: "The Tree",
    audio: "/audio/narration/tree.mp3",
    phrases: [
      {
        text: "This is the tree we're growing — together, in public, slowly, for as long as it takes.",
        start: 0.06,
        end: 0.55,
      },
      { text: "You're welcome to add water.", start: 0.55, end: 0.8 },
      { text: "Here is where.", start: 0.8, end: 1 },
    ],
  },
];

export const getActScript = (id: string) => NARRATION.find((a) => a.id === id);
