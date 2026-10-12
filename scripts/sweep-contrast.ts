/**
 * Contrast sweep (Q27).
 *
 * Measures every text role on every surface it is printed on, in both
 * themes, with the paper texture multiplied over the surface and any
 * role alpha composited — i.e. what the eye actually gets.
 *
 *   must clear 4.5:1   titles and body (accent), handwriting (ink), captions
 *                      and labels (muted), the accent mark
 *   must clear 3:1     placeholders (hint) and the unselected index numbers:
 *                      faint by design, but never faint enough to look
 *                      disabled (Q31)
 *   reported only      subtle
 *
 * Run: node scripts/sweep-contrast.ts
 */

import {
    THEME,
    TEXTURE_ON,
    TARGET,
    luminance,
    contrastRatio,
    hexToRgb,
    textured,
    over,
    type RGB,
} from "../src/lib/contrast.ts"

const ratio = (fg: RGB, bg: RGB) => contrastRatio(luminance(...fg), luminance(...bg))

// Which roles appear on which surface.
const ON: Record<string, { surface: keyof (typeof THEME)["light"]["surface"]; tex: number; must: string[]; soft?: string[]; info: string[] }> = {
    desk: { surface: "desk", tex: TEXTURE_ON.desk, must: ["muted"], info: [] },
    ruler: { surface: "ruler", tex: TEXTURE_ON.ruler, must: ["muted", "ink"], soft: ["index"], info: [] },
    sheet: { surface: "sheet", tex: TEXTURE_ON.sheet, must: ["accent", "ink", "muted", "mark"], soft: ["hint"], info: ["subtle"] },
    card: { surface: "card", tex: TEXTURE_ON.card, must: ["ink", "accent"], info: [] },
}
const SOFT_TARGET = 3

let pass = true
for (const [themeName, theme] of Object.entries(THEME)) {
    console.log(`\n${themeName}`)
    for (const [where, spec] of Object.entries(ON)) {
        const bg = textured(hexToRgb(theme.surface[spec.surface]), spec.tex)
        const cells: string[] = []
        const soft = spec.soft ?? []
        for (const role of [...spec.must, ...soft, ...spec.info]) {
            const v = theme.text[role as keyof typeof theme.text]
            const fg = Array.isArray(v) ? over(hexToRgb(v[0]), v[1], bg) : hexToRgb(v)
            const r = ratio(fg, bg)
            const must = spec.must.includes(role)
            const isSoft = soft.includes(role)
            const bad = (must && r < TARGET) || (isSoft && r < SOFT_TARGET)
            if (bad) pass = false
            cells.push(`${role} ${r.toFixed(2)}${bad ? " ← FAIL" : must ? "" : isSoft ? " (≥3)" : " (info)"}`)
        }
        console.log(`  ${where.padEnd(6)} ${theme.surface[spec.surface]}  ${cells.join("   ")}`)
    }
}
console.log(pass ? "\nPASS" : "\nFAIL")
process.exit(pass ? 0 : 1)
