import { STORY } from "~/content/story"

/**
 * One title per sheet, in order, for the index tabs — taken from the story
 * (Q32), so the tabs, the pages and the count can't drift apart.
 */
export const TITLES = STORY.map((page) => page.tab)
