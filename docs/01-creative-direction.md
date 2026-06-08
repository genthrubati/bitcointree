# BitcoinTree — Creative Direction

## What this is

BitcoinTree is not a product. It's not a dashboard, a wallet, or a pitch.
It is a **monument you scroll through** — a short film that happens to be a website.

Its job is to make a single feeling land in the visitor's chest:

> *Some things that matter cannot be rushed. They are planted, tended, and trusted — and decades later, they shade people who never met the one who planted them.*

Bitcoin is presented as the latest expression of that idea, not as an investment. If someone leaves the site thinking "I want to be part of something that outlives me" rather than "I should buy some," we have succeeded.

---

## 1. Story Structure

A seven-act film, each act a chapter you scroll into rather than click toward.

| Act | Name | Narrative Question | Emotional Register |
|---|---|---|---|
| I | **Seed** | What does it look like before anything has happened? | Stillness, potential, intimacy |
| II | **Growth** | What does patience look like across time? | Quiet wonder, momentum |
| III | **Civilization** | What did humans build once they could trust each other? | Awe, scale, pride |
| IV | **Monetary Decay** | What happens when the thing we trust is broken on purpose? | Unease, gravity, loss |
| V | **Bitcoin** | What did someone plant in response? | Clarity, relief, recognition |
| VI | **Hope** | What does it feel like to realize you can be part of this? | Lightness, possibility |
| VII | **The Tree** | What are we growing together, right now, in public? | Belonging, quiet responsibility, awe |

This is a classic three-act structure wearing a seven-scene costume: **setup (I–III) → rupture (IV) → resolution and invitation (V–VII)**. The seed planted in Act I visually returns, fully grown, in Act VII — the loop is the message.

---

## 2. Emotional Progression

The visitor's pulse should move like this, plotted across the scroll:

```
intensity
  ▲
  │                                    ╭────╮
  │                              ╭─────╯    ╰── VII (settled awe)
  │                         ╭────╯ VI
  │     ╭───╮      ╭────────╯
  │     │   ╰──────╯ III              V (release)
  │ ────╯ I    II              ╲    ╱
  │              calm,        ╲  IV  ╱  (the dip — decay)
  │              building       ╲  ╱
  └──────────────────────────────────────────────► scroll
       I      II      III     IV      V      VI     VII
```

- **I–II** open in near-silence: a single seed, a single sprout. We are training the visitor to slow their own scrolling down.
- **III** lifts the energy — civilizations rising, trade, language, trust networks — visually rich and warm.
- **IV is the only "negative" beat** in the entire piece. It should feel like a held breath: desaturation, weight, a sense of something being quietly taken. Never angry, never preachy — just true and a little sad.
- **V** is the exhale. A single warm point of light appears. This is the turn.
- **VI** opens the chest back up — motion returns, the palette warms, the tree visibly grows again.
- **VII** lands at a resting plateau: not a climax, a *plateau* — because the message is "this continues after you leave," not "the story is over."

---

## 3. Visual Language

**Palette**
- Base: paper white (`#FAFAF8`) and ink black (`#0A0A0A`) — never pure `#FFFFFF`/`#000000`, which feel clinical.
- Single accent: Bitcoin orange, used like a flame — `#F7931A`, but desaturated to ~70% opacity in most appearances so it glows rather than shouts. It appears only at moments of *significance* (a seed, a coin, a root, the final address) — never as decoration.
- Act IV (Decay) temporarily drains the palette toward greys and cool undertones — the only section that breaks the warm paper-and-ink world. Its return to warmth in Act V is the emotional hinge of the whole piece.

**Composition**
- Generous negative space — closer to a gallery wall than a web page. Content rarely exceeds 60% of viewport width on desktop.
- Editorial grid (12-column, asymmetric placements) — text and image rarely centered together; one leads, one follows, the way a caption follows a photograph.
- Macro-to-micro camera logic: each act either pushes in (seed → cell → ring) or pulls out (sapling → forest → civilization), never both in the same breath. This mimics documentary cinematography and gives scroll motion a *reason* to exist.

**Imagery**
- Photographic and organic textures (root systems, tree rings, paper grain, ink bleeds, engraving-style line art for "civilization" motifs) rather than illustrations that look "designed."
- No stock-photo crypto iconography. No coins-falling-from-sky, no glowing globes, no circuit-board textures.

---

## 4. Animation Language

Animation is **punctuation, not decoration**. Three rules govern it:

1. **Everything moves at the speed of growth.** Easing curves favor slow-start, slow-settle (`power2.inOut`, custom cubic-beziers around `0.22, 1, 0.36, 1`). Nothing snaps. Nothing bounces. A tree does not spring into place.
2. **Scroll position is time.** The user's scroll *is* the timeline scrubber (GSAP ScrollTrigger `scrub`). They are not triggering animations — they are controlling the speed of time passing. This is the single most important technical-emotional decision in the project.
3. **One idea per scene.** Each act has exactly one animated "thesis move" — a root spreading, a ring forming, a coin appearing, a light turning on. Supporting elements (text, particles, gradients) respond to that one move; they don't compete with it.

Transitions between acts are **match-cuts**, not wipes or fades: the seed becomes the cell, the ring becomes the coin, the candle flame becomes the orange glow of Act V. Visual continuity across cuts is what makes the piece feel directed rather than assembled.

---

## 5. Typography Philosophy

- **Display/Narration**: a humanist serif with editorial weight (e.g., a high-contrast serif like *GT Super*, *Canela*, or — as an accessible default — *Source Serif 4* / *Spectral*). Serif = history, permanence, the printed page, the documentary lower-third.
- **UI/Interface**: a clean grotesk (e.g., *Inter* or *Suisse Int'l*) for any functional element — buttons, labels, the live-balance readout, the Bitcoin address. Grotesk = "this is a tool you can use right now," contrasted against the serif's "this is a story being told to you."
- Large type, generous line-height (1.4–1.6), short measure (45–65 characters per line). Narration text reads like subtitles in a film — never more than 2–3 lines visible at once.
- Numerals (balances, addresses, dates) are always set in the grotesk in tabular figures — they should look *measured*, not narrated.

---

## 6. Sound Design Philosophy

Sound is optional, ambient, and respectful — never autoplay-with-volume.

- A **single continuous ambient bed** runs underneath the entire experience (room tone: wind through leaves, distant water, very faint analog warmth) and *subtly* shifts per act — e.g., it thins and cools during Act IV, then a single low warm tone re-enters at Act V.
- **Narration** is a calm, unhurried human voice (think nature-documentary narrator, not movie trailer). It is short — a sentence or two per act — and synced to scroll position with generous silence around it. Silence is part of the sound design.
- A **muted toggle** (visually minimal, top corner) is presented once, gently, and remembered via local storage. Default state is muted — the experience must be 100% complete and meaningful with sound off, since most visitors will scroll with sound off.
- No UI sound effects (no clicks, dings, whooshes on buttons). The only "interface sound" permitted is the soft swell that accompanies the QR/address reveal in Act VII — and even that is optional and tied to the ambient bed, not a discrete SFX.

---

## 7. User Journey

1. **Arrival** — A single seed sits center-frame on a paper-white field. No navigation, no logo treatment, no CTA. Just a small instruction: *"Scroll to begin."* The visitor's first action is an act of patience.
2. **Descent into time** — Scrolling moves the visitor *through* time rather than *down a page*. Each act fills the full viewport; the visitor never sees two acts at once (no competing content), reinforcing "one idea, fully felt, before the next."
3. **The dip** — Act IV intentionally makes the visitor a little uneasy. This is allowed — even necessary. A story about why Bitcoin matters that never makes you feel the cost of the status quo hasn't earned its resolution.
4. **The turn** — Act V's appearance of light is the payoff for sitting through Act IV. It should feel like *relief*, not like a sales pitch.
5. **Recognition** — By Act VI, the visitor should feel the metaphor click into place on its own — we don't explain it to them; we let the tree and the coin rhyme visually until the connection feels self-discovered.
6. **Invitation** — Act VII doesn't ask the visitor to do anything. It simply *shows them where the tree is being grown* — a public address, a live balance, a QR code — framed as a place they're welcome to add water, not a fundraising target. The copy never says "donate," "invest," "buy," or "support us." It says, in effect: *"This is real. It's growing. Here's where."*
7. **Departure** — The page doesn't "end." It settles into a living, ambient state — the grown tree gently animates in a loop, as if the visitor could leave their browser open and the tree would keep being there. The last thing they feel should be quiet permanence, not closure.

---

## Guiding Constraint

At every decision point — copy, color, motion, sound — ask:

> *"Would this feel at home in a slow, beautifully shot nature documentary about something that takes 100 years to grow? Or does it feel like a website asking for something?"*

If it's the second, cut it.
