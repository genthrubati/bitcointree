# BitcoinTree — Scroll Storyboard

Total runtime target: **3.5–5 minutes** of continuous scrolling at a natural reading pace (≈ 9 full-viewport scenes × ~25–35s of "felt time" each, with Acts I, V and VII intentionally slower).

Global rules carried through every scene (not repeated below):
- One viewport = one scene. No two scenes visible at once.
- All motion is scroll-scrubbed (GSAP ScrollTrigger, `scrub: true`), not autoplay — the visitor is the projectionist.
- Narration line appears as on-screen "subtitle" text (synced to scroll progress) AND as optional spoken audio.
- Transition *out* of each scene is described under that scene; it is also the transition *into* the next.

---

## PROLOGUE — Arrival

**Section name:** `Arrival / Threshold`

**Voice narration:** *(none — silence is the introduction)*
On-screen text: *"This is a story about things that take time. Scroll, slowly, to begin."*

**Visual description:** Full-bleed paper-white field. Dead center, a single dark seed, rendered with soft macro-photographic realism — slightly larger than life, in sharp focus, everything else softly out of focus. Faint grain texture across the frame, like a frame of film stock.

**Animation description:** The seed sits perfectly still for a beat (intentionally — this stillness is the first "move"). A barely-perceptible slow breathing scale (`1.0 → 1.008`, looping) gives it life without motion-as-distraction. The instruction text fades in 1.5s after load, in the grotesk, small, lower third.

**Scroll behavior:** The page does not move with the first ~10% of scroll input — a soft "resistance" (intercepted scroll, eased release) — so the visitor consciously decides to keep going. This is the only scene with scroll resistance.

**Transition behavior:** As the visitor pushes through the resistance, the camera (CSS/WebGL scale + slight parallax) begins a slow push-in toward the seed. The seed's surface texture dissolves into cellular structure — match-cut into Scene 1.

**Emotional goal:** Make the visitor feel they have *chosen* to slow down. Establish that this is not a page to be skimmed.

---

## ACT I — Seed

**Section name:** `01 — Seed`

**Voice narration:** *"Every forest was once a single seed. Every fortune, a single decision. Every trust, a single promise — kept."*

**Visual description:** Macro view, almost abstract: cross-section of the seed, warm earth tones against the paper-white field, a thin vein of Bitcoin-orange light just barely visible at its core — the first and most restrained appearance of the accent color in the whole experience (a coal, not a flame).

**Animation description:** As scroll progresses, the seed's cross-section slowly rotates (3D transform, GSAP, scrub-linked) to reveal the orange vein at its center, which pulses once, gently, in sync with the narration's final word ("kept"). Typography: narration appears one phrase at a time, each phrase replacing the last with a soft cross-fade — like subtitles, never stacking.

**Scroll behavior:** Linear scrub — 1:1 mapping between scroll delta and rotation/reveal progress. No scroll-jacking; the visitor can reverse at will and watch the seed "close" again.

**Transition behavior:** The orange vein brightens and *extends upward*, breaking the seed's silhouette — becoming the first green shoot. Match-cut: seed core → sprout tip.

**Emotional goal:** Intimacy and quiet anticipation — "something is about to begin, and I'm the one who gets to watch it happen."

---

## ACT II — Growth

**Section name:** `02 — Growth`

**Voice narration:** *"Nothing about growth can be rushed. It happens in the dark, underground, for far longer than it ever happens in the light."*

**Visual description:** Camera pulls back in stages: sprout → sapling → young tree, set against a softly blurred horizon line. Below ground (visible via a vertical split composition — sky above, soil cross-section below) an intricate root system spreads in fine linework, echoing the vein from Act I.

**Animation description:** Tree height and root spread are driven by a single GSAP timeline tied to scroll progress — as the visitor scrolls down, *both* canopy and roots extend, in opposite directions, from the same originating point (visual rhyme: growth above mirrors growth below — this image returns transformed in Act VII). Leaves arrive as small particle-like marks that "settle" onto branches rather than sprouting from them — feels organic, not procedural.

**Scroll behavior:** Scrub-linked scene with a slight "lag" easing on the root system (roots extend ~150ms behind the canopy) — subtle, felt-not-seen, reinforcing "growth below precedes growth above."

**Transition behavior:** As the root system reaches the edges of frame, individual root tips brighten into small points of warm light — match-cut into the lit windows of distant buildings, becoming Scene 3's skyline.

**Emotional goal:** Quiet wonder; a sense of time compressing gently — the visitor feels years pass without feeling rushed.

---

## ACT III — Civilization

**Section name:** `03 — Civilization`

**Visual description:** Wide establishing composition: an engraved-line-art skyline rendered in ink-on-paper style (echoing old banknote engravings, but abstracted — no real currency imagery), overlaid with faint moving lines that suggest trade routes, ledgers, handshakes, language — networks of trust forming and reforming.

**Voice narration:** *"With trust, we built everything. Cities. Trade. Language. Law. Every one of them, a promise that someone, somewhere, would keep their word — and that the next person would too."*

**Animation description:** The "trust lines" animate as a slowly-growing constellation — nodes appear, connect, brighten, and persist, layering into a dense, beautiful network across the skyline as the visitor scrolls. Parallax depth: foreground figures (silhouetted, anonymous, universal — not culturally specific) drift slightly faster than the skyline, giving the frame dimensionality.

**Scroll behavior:** Scrub-linked network growth — scrolling forward adds connections; scrolling back removes the most recent ones, so the visitor can "rewind history" and watch trust *un-form*, which subtly previews the tonal shift to come.

**Transition behavior:** The constellation reaches critical density, brightens to its warmest point — and then a single connecting line, near center frame, *flickers and breaks*. The frame desaturates from that point outward like ink spreading through water. Match-cut into Scene 4.

**Emotional goal:** Pride and awe — "look what trust makes possible" — laying the emotional collateral that Act IV will spend.

---

## ACT IV — Monetary Decay  *(the dip)*

**Section name:** `04 — Monetary Decay`

**Voice narration:** *"But somewhere along the way, the promise changed. The thing we agreed to trust could be quietly, endlessly, created out of nothing. A little less, every year, for everyone who had saved."*

**Visual description:** The palette drains to cool greys and muted ink tones — the only desaturated scene in the experience. Visual motif: a single stack/column (rendered abstractly — think a measuring column or a candle, never a literal banknote or chart) slowly, almost imperceptibly *shortens* as the visitor scrolls — eroding rather than crashing. No numbers, no charts, no panic — just quiet, continuous loss.

**Animation description:** A slow vertical shrink (GSAP, scrub, ease `power1.in` — accelerating ever so slightly, the way erosion accelerates) paired with a subtle *desaturation filter* that increases with scroll progress. Background "trust constellation" from Scene 3 is still faintly visible, but its lines are now dimming and disconnecting one by one.

**Scroll behavior:** Slower scrub ratio than other scenes (scroll moves the visitor through this scene more slowly than the equivalent scroll distance elsewhere) — we want the visitor to *sit* in this feeling rather than pass through it. This is the only scene where pacing is deliberately heavier.

**Transition behavior:** At the scene's lowest point — maximum desaturation, minimum height — everything goes nearly to a single muted grey-black frame… and holds, just slightly too long for comfort. Then, in the exact center of that stillness, a single pinprick of warm orange light appears. Hard match-cut: darkness → first light of Scene 5.

**Emotional goal:** Unease and gravity — never anger, never blame, just the felt *weight* of something valuable being quietly diminished. This scene must earn the relief that follows.

---

## ACT V — Bitcoin  *(the turn)*

**Section name:** `05 — Bitcoin`

**Voice narration:** *"Then, someone planted something different. A promise that could not be quietly changed. Not by a government. Not by a company. Not by anyone — including its creator. Just rules, written down, and kept by everyone, for everyone."*

**Visual description:** From the single point of light in the prior scene's final frame, the screen slowly warms and brightens into a clean, minimal orange-on-paper-white composition: a precise, geometric rendering of a coin/seal mark — restrained, almost like a wax seal or a engraved medallion, never a "crypto logo." It is the first time in the experience the orange accent is allowed to be the dominant color — and even then, used sparingly, with enormous surrounding white space.

**Animation description:** The seal/mark slowly resolves from a single point into its full geometric form via a precise line-drawing animation (SVG stroke-dashoffset, scrub-linked) — deliberate, exact, almost mathematical, in contrast to the organic growth of Acts I–III. This contrast *is* the message: nature grows by adaptation, Bitcoin "grows" by unchanging rule.

**Scroll behavior:** Scrub returns to a normal (slightly faster than Act IV) ratio — pacing itself signals "we've moved through the heavy part."

**Transition behavior:** Once fully resolved, the mark's outer ring extends outward past the frame edges and *becomes* the silhouette of a tree canopy — match-cut: coin ring → treetop. The visitor realizes, in the cut itself (not in the copy), that the metaphor has folded back on itself.

**Emotional goal:** Clarity and release — the exhale after Act IV's held breath. Recognition, not persuasion.

---

## ACT VI — Hope

**Section name:** `06 — Hope`

**Voice narration:** *"You don't have to understand all of it to be part of it. You only have to plant something, and let time do what time does. That's all a seed has ever needed from anyone."*

**Visual description:** A wide, warm composition: countless small saplings (rendered in the same warm ink-and-orange palette) spread across a soft horizon — each one slightly different, none identical, suggesting individuality within a shared effort. Light quality shifts to "golden hour" — the warmest moment in the entire piece.

**Animation description:** As the visitor scrolls, saplings nearest the viewport grow in height at slightly varied rates (randomized seed values, GSAP stagger tied to scroll progress) — a living field rather than a single hero tree. Subtle parallax across three depth layers gives the sense of an enormous, continuing field extending beyond the frame in all directions.

**Scroll behavior:** Scrub-linked growth with gentle stagger — the visitor's scroll causes a *field* to grow, not a single object, reinforcing "this is bigger than one story, one tree, one person."

**Transition behavior:** The camera selects one sapling near center frame and pushes in on it specifically — the others fall away into soft bokeh. That sapling becomes the subject of the final scene. Match-cut: field of saplings → the one tree.

**Emotional goal:** Lightness, possibility, an opening of the chest — "I could be one of these."

---

## ACT VII — The Tree  *(arrival, and invitation)*

**Section name:** `07 — The Tree`

**Voice narration:** *"This is the tree we're growing — together, in public, slowly, for as long as it takes. You're welcome to add water. Here is where."*
*(Final line is delivered, then the narration ends — and does not resume. Silence closes the piece, just as it opened it.)*

**Visual description:** A single, fully-grown tree, rendered with the same macro-realist warmth as the seed in the Prologue — its canopy and root system both visible (vertical split composition returns from Act II, now complete and luminous on both halves). Beneath it, with significant negative space and restraint: a live Bitcoin balance readout (set in tabular grotesk numerals), a Bitcoin address presented as elegant typographic object (not a "form field"), and a QR code rendered as if engraved into bark — textured, organic, intentional.

**Animation description:** The tree gently sways in a slow, looping ambient animation (think: the calm of a nature documentary's closing shot — looped seamlessly, so the page never feels "finished," only "currently like this"). The balance figure ticks upward in real time when contributions occur (subtle digit-roll animation, no flashy counters). The QR code "grows into" visibility via the same line-drawing technique as the Act V seal — visual rhyme, full circle.

**Scroll behavior:** Scrub slows to near-stillness — the visitor arrives at a *plateau*, not a climax. Scrolling further produces only the smallest amount of additional reveal (root system fully extends, light shifts slightly toward dusk) — signaling "you have arrived; there is nowhere further to go but to stay a while."

**Transition behavior:** None — this is the resting state. The page does not "end"; it settles. If the visitor scrolls back up from here, every prior scene replays in gentle reverse, exactly as it played forward — reinforcing that nothing in this story was an animation trick; it was *time*, and time runs both ways on this page.

**Emotional goal:** Belonging and quiet responsibility. The visitor should feel they've been shown something real and ongoing, and that they are welcome — not pitched — to take part. No marketing language anywhere in this scene: no "Donate Now," no "Join the Movement," no urgency, no scarcity. Just an open hand and an address.

---

## Pacing Summary

| Scene | Felt Duration | Scrub Ratio | Energy |
|---|---|---|---|
| Prologue | ~20s | resisted → linear | Stillness → curiosity |
| I — Seed | ~25s | 1:1 | Intimacy |
| II — Growth | ~30s | 1:1 (roots lag) | Quiet wonder |
| III — Civilization | ~35s | 1:1 (reversible growth) | Awe, pride |
| IV — Monetary Decay | ~40s | slowed (~0.7×) | Unease, gravity |
| V — Bitcoin | ~30s | 1:1 (slightly faster) | Clarity, release |
| VI — Hope | ~35s | 1:1, staggered | Lightness |
| VII — The Tree | ~45s+ (plateau, no forced exit) | near-still | Belonging |

**Total: ~4.0–4.5 minutes** at natural scroll pace — within target.
