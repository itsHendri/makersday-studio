# Status — 2026-11-04

**Maker's Day Studio** (Q32, Q33). A creative studio that makes things,
takes on projects and collaborations, and meets for a making day. The site
is a storytelling piece about the art of making: ten sheets in a pile on a
graph-paper desk, slid off one by one to the left as you scroll, down to a
back cover with the faces, the colophon and the signup sheet.

Live at https://itshendri.github.io/makersday-studio/ (GitHub Pages, built
from `main`). `main` is clean; the last change is PR #7.

The ten sheets, from `src/content/story.ts`:

1. The art of making
2. Awareness
3. Write it down (the visitor's, ruled)
4. Trust the process
5. Draw it out (the visitor's, dotted)
6. Any material
7. Anywhere
8. Prototype everything
9. Again, better
10. Make it with us

Look: blue on pale blue paper (light), and charcoal sheets on a green
cutting mat (dark), from Figma's Theme variables (Q27, Q33). Amatic SC
titles, Inter body, Courier Prime labels, Special Elite captions, no
handwriting (Q28). The muralia.at-style panel version was compared and
deleted; the pile stays (Q32).

## Verified — 2026-11-04

| Check | Result |
|---|---|
| `astro check` | 0 errors, 0 warnings, 1 hint |
| `node scripts/sweep-contrast.ts` | PASS, both themes, texture charged. Lowest required: light muted on the desk 5.14:1, mark on the sheet 4.75:1; dark muted on the sheet 8.30:1 |
| Live site | title, description, canonical, og:image (1200 × 630 cover) and favicon present; all 24 images have alt text; ~400 KB transferred on load |
| Live images | one AVIF returned 503 once from GitHub Pages and 200 on three retries: the CDN, not the build |

Never verified: **motion feel** (the slide, its ease, the hold, the back
cover's arrival). The agent tab runs no rAF while the pane is hidden. This
is Hendri's ⌘P check. **Lighthouse** on the live URL has never been run.

## Next — needs Hendri

0. **Before sharing: connect the signup sheet.** `endpoint` in
   `src/content/signup.ts` is `null`. Make a Formspree form
   (`https://formspree.io/f/<id>`) or a Web3Forms key
   (`https://api.web3forms.com/submit`) and set it. Until then the form
   cannot send, and the back cover shows no "+" (Q31).
1. **⌘P the pile.** Three constants, one each:
   - how long a page rests before it moves: `HOLD = 0.35` in `src/lib/pile.ts`;
   - how far it turns as it slides off: `SWEEP_DEG = -4` in `src/lib/scroll-rig.ts`;
   - the back cover's reveal under the last sheet.
2. **The copy.** `src/content/story.ts` is a first draft, and so are the
   prompts on the write and draw pages. Hendri owns the words.
3. **Real photographs.** Swap the Unsplash placeholders one key at a time in
   `src/content/clippings.ts`; local imports work in the same `Clipping`.
   The back-cover credits regenerate themselves. Riso duotones want
   high-contrast pictures.
4. **Scan the real paper** (600dpi, a blank area, made seamless) for
   `src/assets/textures/paper.png`. Then delete
   `scripts/make-paper-texture.ts` and set `TEXTURE_MEAN` in `contrast.ts`
   from the scan (Q20).
5. **The other 35 pins.** Only 24 of the Zine board's 59 were visible signed
   out. Screenshots of the rest would finish the list; the tracing-paper
   overlay, bulldog clip and pixel motifs are unbuilt.
6. **Buy makersday.studio**, then:
   - set `site` to `https://makersday.studio` and `base` to `"/"` in
     `astro.config.mjs`;
   - add `public/CNAME` containing `makersday.studio`;
   - add the GitHub Pages DNS records at the registrar, and set the custom
     domain in the repo's Pages settings.
   The old `/quarta-collective/` links already broke with the repo rename
   and GitHub does not redirect them.

## Next — can be built without Hendri

See `FUTURE.md` for the full backlog. The two worth doing first:

1. **Keep the page across a resize.** `onResize` in `src/lib/scroll-rig.ts`
   re-measures but does not re-anchor, so resizing the window lands on a
   different sheet. Read the page from `detail.page` before measuring, then
   scroll to `progressForSheet(page, n)` (in `src/lib/pile.ts`) after.
2. **Run Lighthouse** against the live URL and record the numbers here.

## Loose ends

- The `deploy` script in `package.json` still names the Cloudflare project
  `quarta-collective`. It is unused (the site is on GitHub Pages) and names
  a Cloudflare project, not the repo (Q33). Rename or remove it if
  Cloudflare is ever used.
- The local folder may still be called quarta-collective on other machines.

## History

Every pass is recorded in `DECISIONS.md` (Q1–Q33) and `CHANGELOG.md`; the
earlier STATUS tables (the fourteen-spread strip at Q13, the pile at Q19)
are in git history before 2026-11-04.
