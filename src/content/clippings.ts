/**
 * Placeholder clippings — Unsplash photographs, by key.
 *
 * These are STAND-INS until the studio's own photographs exist. Each is
 * referenced from a spread by key, so swapping one out is a one-line change
 * here and the colophon's credit list is generated, never hand-maintained.
 *
 * `?w=2400` is at least twice the widest clipping box, so the 2× srcset
 * candidate astro:assets emits is real pixels rather than an upscale
 * (DECISIONS Q4). The host is allowed in astro.config.mjs.
 *
 * Ids come from the public search results, not from a photo page. Two of the
 * first picks 404'd at build — Unsplash+ pictures are served from a different
 * host, and a search thumbnail does not tell you which — so every id here was
 * HEAD-checked against images.unsplash.com before it went in. Do that for any
 * replacement: a dead id fails the whole build, not just one picture.
 */

export interface ClippingSource {
    /** Unsplash photo id, `photo-…`. */
    id: string
    /** What the picture shows — the alt text. */
    alt: string
    /** Photographer's Unsplash handle, for the colophon. */
    by: string
}

export const SOURCES = {
    paint: {
        id: "photo-1501366062246-723b4d3e4eb6",
        alt: "Two hands covered in blue and green paint",
        by: "amavmexia",
    },
    pillows: {
        id: "photo-1742130847739-f7728ae50176",
        alt: "A notebook filled with pencil sketches of pillows",
        by: "purejulia",
    },
    desk: {
        id: "photo-1635183783375-98e857771351",
        alt: "A person at a desk, pen in hand, drawing",
        by: "lesiart",
    },
    portrait: {
        id: "photo-1616898297271-47896b4daaf1",
        alt: "A pencil sketch of a man's face on white paper",
        by: "afnan05",
    },
    sculptor: {
        id: "photo-1447758902204-48010b87c24d",
        alt: "A sculptor shaping a large unfinished head in his studio",
        by: "iliazolas",
    },
    printers: {
        id: "photo-1611117775350-ac3950990985",
        alt: "A row of 3D printers making blue plastic parts on a workbench",
        by: "minkus",
    },
    brushes: {
        id: "photo-1613574714687-c33b9e90200d",
        alt: "Jars of paintbrushes beside a palette of mixed paint",
        by: "lauraadaiphoto",
    },
    clay: {
        id: "photo-1589051088132-06f36a22012a",
        alt: "Hands covered in wet clay shaping the rim of a bowl",
        by: "polarmermaid",
    },
    wiring: {
        id: "photo-1775519686045-cfd36ca0accc",
        alt: "Hands wiring electronics next to a laptop",
        by: "ericstoynov",
    },
    homedesk: {
        id: "photo-1758640920659-0bb864175983",
        alt: "A design desk at home with a laptop, keyboard and books",
        by: "lgnwvr",
    },
    studio: {
        id: "photo-1759333213207-daabf2584348",
        alt: "An artist's studio with canvases, shelves and trestle tables",
        by: "quietcreativestudio",
    },
    benchtop: {
        id: "photo-1631396326628-3105f48b6f2b",
        alt: "A wooden bench top covered in workshop odds and ends",
        by: "baileyal3xander",
    },
    model: {
        id: "photo-1772340163600-ae81082b02df",
        alt: "A cardboard and wood model of a building",
        by: "ozym",
    },
    printing: {
        id: "photo-1758387836566-6a342434f5b4",
        alt: "A 3D printer printing a red part",
        by: "jakubzerdzicki",
    },
    parts: {
        id: "photo-1786840320375-d7e316278cc8",
        alt: "Cardboard and metal prototype parts laid out on white",
        by: "spencerliao",
    },
    carving: {
        id: "photo-1496769843785-93aa0be525dc",
        alt: "Hands carving a small wooden bird",
        by: "phito",
    },
    drill: {
        id: "photo-1494660251519-9845cdb85fc3",
        alt: "Hands at a drill press",
        by: "adigold1",
    },
    sewing: {
        id: "photo-1568288796918-03e7d93306bd",
        alt: "Hands sewing white fabric with a needle and thread",
        by: "eliomendes",
    },
    artclass: {
        id: "photo-1757085242652-f8cd4d3de889",
        alt: "People working at a shared table in an art class",
        by: "anya_richter",
    },
    tools: {
        id: "photo-1497218770144-3fea6dbc33fe",
        alt: "Hand tools laid out on a table",
        by: "drscythe",
    },
} as const satisfies Record<string, ClippingSource>

export type ClippingKey = keyof typeof SOURCES

export function clippingUrl(key: ClippingKey): string {
    return `https://images.unsplash.com/${SOURCES[key].id}?w=2400&q=80&auto=format`
}

/** Distinct photographers, in the order the pictures appear (SOURCES is
 * kept in that order), for the colophon. */
export const CREDITS: string[] = Array.from(
    new Set(Object.values(SOURCES).map((s) => s.by))
)
