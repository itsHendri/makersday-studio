# makersday-studio

**Maker's Day Studio** — a creative studio that makes things: projects,
collaborations and a making day. (Quarta Collective until 2026-10-25.)

This site tells the story of the art of making, in ten sheets on a desk:
notice, start before you're ready, use any material, make it anywhere,
prototype everything, do it again, then make it with us. Two of the sheets
are the visitor's own, one to write on and one to draw on. Vertical scroll
slides the sheets off the pile, one by one, to the left, down to a back
cover. The words are in `src/content/story.ts`.

Live: https://itshendri.github.io/makersday-studio/ (makersday.studio, once
the domain is bought)

## Where it comes from

A fork of [memory-lane](https://github.com/itsHendri/memory-lane) (SECTOR
READ), which was built so its scroll rig, token layering and type system could
be lifted into the next piece. This is the next piece. The rig, the sticky
stage, the derived colour tokens and the measured-contrast discipline come
across unchanged; the recovery-machine fiction (WebGL lens, CRT tube, boot
terminal, synthesized static) does not.

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 5, static output, TypeScript strict |
| Styling | Vanilla CSS + custom properties (`src/styles/`) |
| Motion | The inherited scroll rig — native scroll + sticky stage + lerped pan, no library |
| Paper | CSS only: SVG-noise grain, ruling, staples, tape, torn edges, stamps, block prints, halftone, duotones |
| Type | Special Elite · Caveat · Courier Prime, via `@fontsource` |
| Content | Hand-authored Astro markup, one file per spread (`src/spreads/`) |
| Imagery | Unsplash placeholders, optimised to AVIF at build (`src/content/clippings.ts`) |
| Hosting | GitHub Pages |

## Running it

```bash
npm install
npm run dev         # localhost:5251/makersday-studio/
npm run typecheck
npm run build
node scripts/sweep-contrast.ts
```

`/specimen` is a permanent dev surface for the type system.

## The dossier

| File | What it holds |
|---|---|
| `CLAUDE.md` | Auto-loaded context; the invariants that must not break |
| `STATUS.md` | Current state, dated |
| `DECISIONS.md` | Rationale, append-only (`Q1…`), citing memory-lane `A#N` and upstream `#N` |
| `FUTURE.md` | Next-session entry point + backlog |
| `CHANGELOG.md` | Keep-a-Changelog log |

## Credits

Placeholder photographs: Unsplash, credited by handle in the colophon and in
`src/content/clippings.ts`. Type: Special Elite, Caveat, Courier Prime (all OFL).
Direction: Hendri's "Zine" Pinterest board. A piece by hendri.design · 2026.
