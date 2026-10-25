/**
 * The story, page by page (Q32) — the words only.
 *
 * Maker's Day Studio is a creative studio that makes things, takes on
 * projects and collaborations, and meets for a making day. The story follows
 * the stages of making — notice, start, use anything, make it anywhere, try
 * it, do it again — and ends with an invitation: why we make, how making
 * works, then your turn.
 *
 * The spreads (`src/spreads/`) place the pictures by hand and read their
 * words from here; the index tabs and the sheet count come from here too.
 * Two pages — write and draw — are the visitor's own; they carry a title and
 * a prompt, no pictures.
 *
 * `title` is [plain, emphasised]: the emphasised word is the one the
 * headline leans on (`<em>`), as in every spread since Q24.
 */

import type { ClippingKey } from "~/content/clippings"

export interface StoryPhoto {
    src: ClippingKey
    /** Typed under the picture. */
    caption: string
}

export interface StoryPage {
    /** Short name for the index tab and the aria-label. */
    tab: string
    title: [string, string]
    body: string
    photos: StoryPhoto[]
    /** The visitor's pages: what they write or draw. */
    notebook?: { kind: "write" | "draw"; key: string; prompt: string }
}

export const STUDIO = "Maker's Day Studio"

export const STORY: StoryPage[] = [
    {
        tab: STUDIO,
        title: ["The art of", "making"],
        body:
            "Maker's Day Studio is a creative studio that makes things — on our own, " +
            "with collaborators, and for anyone with a project. Paper or pixels, clay " +
            "or code: the medium changes, the making doesn't. This is how a thing " +
            "gets made.",
        photos: [{ src: "paint", caption: "it starts in the hands" }],
    },
    {
        tab: "Awareness",
        title: ["", "Awareness"],
        body:
            "Ideas don't arrive. They get noticed. A hinge on a café door. The way a " +
            "receipt folds itself and stays folded. The shape a shadow makes at four " +
            "o'clock. Making starts with paying attention — and with writing it down " +
            "before it stops being interesting.",
        photos: [
            { src: "pillows", caption: "looked at long enough to draw" },
            { src: "desk", caption: "notes before anything else" },
        ],
    },
    {
        tab: "Your page — write",
        title: ["Write it", "down"],
        body: "",
        photos: [],
        notebook: {
            kind: "write",
            key: "write-1",
            prompt: "What did you notice this week? Write it down before it stops being interesting.",
        },
    },
    {
        tab: "Trust the process",
        title: ["Trust the", "process"],
        body:
            "The first version is supposed to be wrong. Start before you're ready, " +
            "make the bad one, then the next one. Everything worth keeping went " +
            "through an ugly stage first, and the only way past it is through it.",
        photos: [
            { src: "sculptor", caption: "not finished. not yet." },
            { src: "portrait", caption: "attempt no. 14" },
        ],
    },
    {
        tab: "Your page — draw",
        title: ["Draw it", "out"],
        body: "",
        photos: [],
        notebook: { kind: "draw", key: "draw-1", prompt: "Twenty bad drawings. Start with one." },
    },
    {
        tab: "Any material",
        title: ["Any", "material"],
        body:
            "Paper, pixels, filament, paint, clay, code. We don't choose a medium " +
            "first; we choose the idea, then whatever gets it made. Some days that's " +
            "a sketchbook. Some days it's a 3D printer running through the night.",
        photos: [
            { src: "printers", caption: "running overnight" },
            { src: "brushes", caption: "paint" },
            { src: "clay", caption: "clay" },
            { src: "wiring", caption: "solder and code" },
        ],
    },
    {
        tab: "Anywhere",
        title: ["", "Anywhere"],
        body:
            "We don't have one workshop. There's a design studio in a spare room, an " +
            "office full of 3D printers, a kitchen table on making day. The studio is " +
            "wherever the making happens — and right now, that's a few places at once.",
        photos: [
            { src: "homedesk", caption: "the design studio, at home" },
            { src: "studio", caption: "someone else's, one day ours" },
            { src: "benchtop", caption: "the kitchen table, making day" },
        ],
    },
    {
        tab: "Prototype everything",
        title: ["Prototype", "everything"],
        body:
            "Make it rough, make it fast, make it real enough to test. A cardboard " +
            "model answers questions a drawing can't, and a print that fails at three " +
            "in the morning still teaches you something. Prototypes are how we think.",
        photos: [
            { src: "model", caption: "cardboard, before anything costs money" },
            { src: "printing", caption: "print no. 6" },
            { src: "parts", caption: "the parts that worked" },
        ],
    },
    {
        tab: "Again, better",
        title: ["Again,", "better"],
        body:
            "Then make it again. Change one thing, keep what worked, measure twice. " +
            "The second version is quieter than the first, and the third is the one " +
            "people keep. Making gets better by doing it again, not by waiting.",
        photos: [
            { src: "carving", caption: "the third bird" },
            { src: "drill", caption: "measure twice" },
            { src: "sewing", caption: "unpicked, sewn again" },
        ],
    },
    {
        tab: "Make it with us",
        title: ["Make it", "with us"],
        body:
            "Have a project in mind? A thing you want made, a prototype that needs a " +
            "second pair of hands, an idea somewhere between art, design and " +
            "technology. We take on projects and collaborations — and there's always " +
            "room at the table on making day.",
        photos: [
            { src: "artclass", caption: "making day" },
            { src: "tools", caption: "bring your own, or use ours" },
        ],
    },
]
