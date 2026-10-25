# makersday-studio — project context (auto-loaded)

**Maker's Day Studio** (was Quarta Collective until 2026-10-25, Q32) — a
creative studio that makes things, takes on projects and collaborations, and
meets for a making day. For now it works across a few home studios
(Hendri's design studio, an office with 3D printers); the domain will be
makersday.studio. The website is a VISUAL REPRESENTATION of that: a
storytelling piece about the art of making — notice, start, use any
material, make it anywhere, prototype, do it again, make it with us. Its
words are in `src/content/story.ts`. Vertical scroll takes ten sheets off a
pile on a desk, one by one, sliding each to the left, down to a back cover
(Q19, Q21); Hendri compared a muralia.at-style panel version and kept the
pile (Q32). The look comes from Hendri's
"Zine" Pinterest board; the chosen direction is **exploration 02, the
typewriter** (Q12), since retyped from Hendri's Figma cover (Q24):
Amatic SC titles, Inter body, Courier Prime labels, Special Elite captions;
no handwriting (Q28); colour scans with tape, the index as a ruler down the right.
Colour (Q27, Q33): blue on pale blue paper, and a dark mode of charcoal
sheets on a green cutting mat — from the Figma "Theme" variables, Light and Dark.

This is a **fork of `~/Development/memory-lane`** (SECTOR READ). The scroll
rig, stage layout, derived-colour tokens and the type-system shape are lifted
from it; everything that made that piece a recovery machine is deleted.

**Read `STATUS.md` first, then `DECISIONS.md`.**

## The one rule

**`~/Development/memory-lane/DECISIONS.md` (A1–A23) and its upstream
(`~/Framer/timeline-carousel/DECISIONS.md`, #1–#52) are still law for the
rig.** Nearly every entry records an expensive bug. Before changing anything
in `scroll-rig.ts`, `stage.css`, `contrast.ts` or the hover behaviour, grep
those files. Our own `DECISIONS.md` records only what is NEW here, as
`Q1, Q2…`, citing the others as `(memory-lane A#N)` / `(upstream #N)`.

## What must not break

- **Nothing after the scroll track** — a section below it scrolls the pinned
  stage off the top. The back cover (colophon, credits) lives INSIDE the
  stage, under the pile (upstream #36, Q21).
- **Colour comes from roles, never a literal.** Type binds to `--tc-accent`
  (titles, body), `--tc-fg` (ink: borders, the visitor's writing), `--tc-fg-dim`,
  `--tc-fg-index`, `--tc-fg-hint`, on `--tc-bg` / `--tc-field`; marks use
  `--mark`. Every value is in `tokens.css`, twice (Light, Dark), named after
  the Figma variable's code syntax (Q27). Change a colour in Figma's Theme
  collection AND `tokens.css` AND `THEME` in `contrast.ts`, then run
  `node scripts/sweep-contrast.ts` (both themes, texture charged).
- **The pile's arithmetic lives in `src/lib/pile.ts`** and nowhere else; the
  rig and the chrome both import it. Read the page from `detail.page`, never
  from `floor(p × n)` (Q19).
- **Texture belongs to a surface, never to the viewport.** There is no fixed
  grain any more: sheets move. Change `TEXTURE_ON` in `contrast.ts` when you
  change `--texture-*` in `tokens.css`, and `TEXTURE_MEAN` when you regenerate
  the tile (Q20).
- **`THEME` in `contrast.ts` and `tokens.css` must match.**
- **No red any more.** What the red ribbon did is `--mark`: blue in light
  (`#2C66E0`), brass in dark, and it clears 4.5:1 on the sheet, texture
  included. Faint alphas live in the tokens, not as `opacity` (Q27).
- **Dark mode is `prefers-color-scheme`**, or `data-theme` on `<html>`. The
  desk's SVG tiles (ruler ticks, major grid) carry a baked stroke, so each
  theme has its own `--svg-ticks` / `--svg-major`.
- **The scroll track stops short of the 48px gutter on the RIGHT**
  (`--gutter`, Q14/Q16). The gutter is the index, drawn as a ruler (Q20); its
  ticks and the desk's left ruler share one phase derived from the sheet
  count. Do not put other fixed chrome in it.
- **The cover is page 1.** Tabs read 01–14; the corner reads "p. N".
- **The headline wipe is a mask, never a clip-path** — Chrome's
  IntersectionObserver honours clip-path and the heading would never reveal
  itself (Q6).
- **Clipping ids stay `tc-item-NN-N`** — the rig resolves hover against them.
- **Every Unsplash id is HEAD-checked before it goes in** — a dead id fails
  the whole build, not one picture (Q4).
- Native scroll + sticky stage; only the horizontal wheel axis is intercepted
  (upstream #2, #20). Never add `scroll-behavior: smooth` to `html`.
- **Under the scaled pile, measure with `offsetWidth`, never a rect**
  (upstream #6): the draw canvas maps the pointer through `--sheet-s`.
- The index tabs are real `<button>`s: the piece's only keyboard navigation
  (upstream #16).
- **Exactly two interactive pages — write (p. 03) and draw (p. 05) — plus
  the lightbox and the signup sheet (Q25).** Hendri asked for these in
  review (Q11). Before adding any other "feature", check whether Hendri is
  describing the site or the studio it is about.
- **The story lives in `src/content/story.ts`** (Q32). The index tabs, the
  sheet count (`--tc-sectors`) and the spreads read it; a spread file only
  places pictures. Add or remove a page there AND in `pages/index.astro`
  (the pile's spreads), keeping rulings apart (Q14).
- **Notebook pages persist under stable keys** (`qc:notebook:write-1`,
  `draw-1`), never the page number.
- **Rulings never touch**: every ruled, dotted or squared spread has a plain
  spread on both sides (Q14). No page-edge divider (Q16). Headlines wrap;
  they no longer bleed.

## How to work here

```bash
npm run dev         # localhost:5251/makersday-studio/
npm run typecheck   # astro check
npm run build       # fetches the remote clippings; cache in .astro-cache/
node scripts/sweep-contrast.ts
```

- `/specimen` shows every type preset on every ramp stop.
- **Verify numerically, not from screenshots** where it matters: drive
  `window.__tcPan(p)` and read the DOM. Motion feel is Hendri's ⌘P check.
  When the browser pane is hidden the tab runs no rAF at all: smooth
  scrolls and the rig's loop freeze, and screenshots can be a frame stale.
  `__tcPan` publishes synchronously and still works.
- `node scripts/make-paper-texture.ts` regenerates the paper tile.
- The agent harness resolves `.claude/launch.json` from its own working
  directory root; if `preview_start` cannot find it, a copy pointing
  `npm run dev --prefix` at this folder works.
- **The agent tab has no document focus**, so `element.focus()` moves
  `activeElement` but fires no focus events. To exercise `initFocusFollow`,
  dispatch `new FocusEvent("focusin", { bubbles: true })` on the clipping.
  Smooth `scrollTo` does work in that tab.

## Open

- **Imagery is placeholder.** Unsplash, listed with credits in
  `src/content/clippings.ts` (in order of first use); the colophon is
  generated from it. Swap for the studio's own photographs when they exist.
- **The repo is `itsHendri/makersday-studio`** (renamed from quarta-collective
  on 2026-10-25, Q33), so `base` in astro.config.mjs is `/makersday-studio`.
  The local folder may still be called quarta-collective. When
  makersday.studio is bought: set `site` to it, drop `base` to "/", add a
  `public/CNAME`, and add the DNS records at the registrar.
- Only 24 of the board's 59 pins were visible signed out. Tracing-paper
  overlays, bulldog clips and pixel motifs are unbuilt (FUTURE.md).
- **The paper texture is drawn, not scanned.** A 600dpi scan of the real
  notebook paper should replace `src/assets/textures/paper.png`.
- The copy is a first draft; Hendri owns it.
- The two prompts on the visitor's pages are first drafts.
- **On a phone the pile is vertical** (Q26): sheets are sticky by their
  bottom edge (`--h`, measured by the rig) and the next slides up over the
  last. Never give a phone-layout ancestor of the strip `overflow` other
  than visible, or the sheets stop pinning (upstream #14).
- **The signup form is not connected** until `endpoint` is set in
  `src/content/signup.ts` (Formspree or Web3Forms). Until then the back cover
  shows no "+" (Q31); setting the endpoint brings it back.
