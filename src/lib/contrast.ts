/**
 * Contrast, measured.
 *
 * Until Q27 the foreground was DERIVED: the page tinted through a ramp of
 * paper stocks and every surface's ink and dim tone were computed from its
 * luminance (upstream #21, #33). The theme now comes from the Figma file's
 * variables, Light and Dark, so the colours are authored — but every pair is
 * still MEASURED, here, by `scripts/sweep-contrast.ts`, including the paper
 * texture multiplied over each surface. `THEME` must mirror tokens.css.
 *
 * Pure functions, no DOM.
 */

export type RGB = [number, number, number]

/** WCAG AA for body text. */
export const TARGET = 4.5

function srgbToLinear(c: number): number {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

/** WCAG relative luminance. */
export function luminance(r: number, g: number, b: number): number {
    return (
        0.2126 * srgbToLinear(r) +
        0.7152 * srgbToLinear(g) +
        0.0722 * srgbToLinear(b)
    )
}

/** WCAG contrast ratio between two luminances. */
export function contrastRatio(a: number, b: number): number {
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export function hexToRgb(hex: string): RGB {
    let h = hex.replace("#", "").trim()
    if (h.length === 3)
        h = h
            .split("")
            .map((c) => c + c)
            .join("")
    return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
    ]
}

export const rgbToCss = ([r, g, b]: RGB) => `rgb(${r}, ${g}, ${b})`

/** A colour at `alpha` over `under`, composited — what the eye gets. */
export function over(color: RGB, alpha: number, under: RGB): RGB {
    return [0, 1, 2].map((i) => Math.round(color[i]! * alpha + under[i]! * (1 - alpha))) as RGB
}

/**
 * Paper texture (Q20). Every surface has the fibre tile multiplied over it at
 * some opacity, which darkens the stock the type actually sits on. Charged at
 * the tile's mean (printed by scripts/make-paper-texture.ts).
 */
export const TEXTURE_MEAN = 245.7

/** Each surface's texture opacity — must match --texture-* in tokens.css. */
export const TEXTURE_ON = {
    sheet: 0.45, // .tc-sector::after, paper.css
    desk: 0.5, // .tc-stage::before, stage.css
    ruler: 1, // .tabs background-blend-mode: multiply, NotebookChrome.astro
    card: 0.45, // under the sheet's texture
} as const

/** A colour as it reads with the tile multiplied over it at `opacity`. */
export function textured(c: RGB, opacity: number): RGB {
    const k = 1 - opacity * (1 - TEXTURE_MEAN / 255)
    return [Math.round(c[0] * k), Math.round(c[1] * k), Math.round(c[2] * k)]
}

/** A theme's roles, as in Figma's "Theme" collection. Alpha where it has one. */
export interface Theme {
    surface: { desk: string; sheet: string; ruler: string; card: string }
    text: {
        accent: string // text/title, text/body
        ink: string // text/hand
        muted: string // text/muted
        subtle: string // text/subtle
        mark: string // mark/accent
        index: [string, number] // text/index
        hint: [string, number] // text/placeholder
    }
}

/** Mirrors tokens.css. Light: blue on pale blue paper. Dark: charcoal on a cutting mat (Q33). */
export const THEME: Record<"light" | "dark", Theme> = {
    light: {
        surface: { desk: "#EEF3FB", sheet: "#F7FAFF", ruler: "#F8FBFF", card: "#FBFDFF" },
        text: {
            accent: "#1A52B5",
            ink: "#0F2149",
            muted: "#5B6478",
            subtle: "#737C90",
            mark: "#2C66E0",
            index: ["#5B6478", 0.75],
            hint: ["#737C90", 0.85],
        },
    },
    dark: {
        surface: { desk: "#1C3329", sheet: "#232629", ruler: "#172A22", card: "#2E3236" },
        text: {
            accent: "#D3E4BE",
            ink: "#F1EADA",
            muted: "#C2BFA8",
            subtle: "#A29E86",
            mark: "#E8BE72",
            index: ["#C2BFA8", 0.6],
            hint: ["#A29E86", 0.8],
        },
    },
}
