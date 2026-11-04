# Future — next-session entry point + backlog

## Start here

Read `STATUS.md`, then `CLAUDE.md`'s invariant list, then `DECISIONS.md`
(Q32 and Q33 describe the site as it is now). The piece is complete on
placeholder imagery and deployed. Most of what is left is Hendri's: the
signup endpoint, the ⌘P motion check, the copy, real photographs, the paper
scan and the domain. That list, with exact files and constants, is in
`STATUS.md` under "Next — needs Hendri".

## Can be built now

- **Keep the page across a resize.** The track is in viewport heights, so
  resizing the window lands on a different sheet. In `onResize`
  (`src/lib/scroll-rig.ts`), take the page from `detail.page` before
  `measure()`, then scroll to `progressForSheet(page, n)` from
  `src/lib/pile.ts`. Never derive the page from `floor(p × n)` (Q19).
- **Lighthouse against the deployed URL.** memory-lane's rebuild scored 94;
  this ships a fraction of its JS and no WebGL, so expect better, but
  measure it and record it in `STATUS.md`.
- **A page-turn gesture for the horizontal wheel.** The rig already converts
  horizontal trackpad swipes to page scroll; a snap to the next sheet on a
  flick is the pile's version: throwing the top sheet off. Vertical scroll
  stays native (upstream #2, #20).
- **Click-to-centre.** Hover lifts a clipping; a click could pan it to the
  centre, like pulling a photo toward you. Check it against the lightbox,
  which a click opens now.
- **Hand-drawn SVG variety.** One arrow path, one underline path and four
  motifs repeat everywhere. Three of each, chosen by index, would hide the
  repeat.
- **A page-fold shadow** down the centre of each spread, since a zine is one
  folded sheet. Subtle, and only if it survives the slide.

## Waiting on material from Hendri

- **The rest of the Zine board.** 24 of 59 pins were visible signed out
  (Q8). Unbuilt from what was seen: a tracing-paper overlay clipping
  (`kind="trace"`: a translucent sheet over a picture), a bulldog clip
  holding a scrap, pixel/dither block motifs, and a photograph collaged with
  a stitched pattern. Screenshots of the remaining pins would finish the
  list.
- **Real photographs**, one key at a time in `src/content/clippings.ts`
  (Q4: HEAD-check any remote id first).
- **A 600dpi scan of the real paper** for `src/assets/textures/paper.png`
  (Q20).

## Parked

- **A digital twin of the notebook**, with writable pages in the browser,
  exists at commit `24deb04` if it is ever wanted as its own project (Q10).
- **The panel ("hybrid") version** was compared and deleted (Q32). It is in
  git history before the 2026-10-25 outcome if it is ever wanted again.
