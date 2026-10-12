/**
 * Lightbox — a clipping, held up to the light.
 *
 * Hover already lifts a photograph off the page; a thing that lifts on hover
 * should open on click. Clicking (or Enter / Space on a focused clipping)
 * shows the picture large over the page, with its typed caption, and
 * Escape, the close control or a click on the backdrop puts it back.
 *
 * The root is a native <dialog> opened with showModal() (Q31): the browser
 * keeps focus inside it and makes the page behind inert, which the old
 * hand-built overlay did not. Focus goes to the close control and returns to
 * the clipping afterwards.
 *
 * The large source is `data-full` (a 1600px variant built by astro:assets),
 * falling back to whatever the <img> is currently showing.
 */

export interface LightboxOptions {
    root: HTMLDialogElement
}

export function initLightbox(options: LightboxOptions): () => void {
    const { root } = options
    const img = root.querySelector<HTMLImageElement>("img")
    const cap = root.querySelector<HTMLElement>("figcaption")
    const closeBtn = root.querySelector<HTMLElement>("[data-lb-close]")
    if (!img || !cap || !closeBtn || typeof root.showModal !== "function") return () => {}

    let opener: HTMLElement | null = null

    const open = (fig: HTMLElement) => {
        const source = fig.querySelector<HTMLImageElement>("img")
        img.src = fig.dataset.full || source?.currentSrc || source?.src || ""
        img.alt = source?.alt ?? ""
        cap.textContent = fig.dataset.tcLabel ?? ""
        opener = fig
        root.showModal()
        closeBtn.focus({ preventScroll: true })
    }
    // Every way out — Escape, the control, the backdrop — ends here. Run
    // directly by close(), and again by the dialog's own "close" event for
    // Escape, which the browser handles; the second run finds nothing to do.
    const onClose = () => {
        if (!opener) return
        img.removeAttribute("src")
        opener.focus({ preventScroll: true })
        opener = null
    }
    const close = () => {
        if (root.open) root.close()
        onClose()
    }

    const clippingFrom = (t: EventTarget | null) =>
        (t as HTMLElement | null)?.closest<HTMLElement>(".clipping") ?? null

    const onClick = (e: MouseEvent) => {
        if (root.open) {
            // Inside the dialog: only the close control or the backdrop close.
            const t = e.target as HTMLElement
            if (t === root || t.closest("[data-lb-close]")) close()
            return
        }
        const fig = clippingFrom(e.target)
        if (fig) open(fig)
    }
    const onKey = (e: KeyboardEvent) => {
        if (!root.open && (e.key === "Enter" || e.key === " ")) {
            const fig = clippingFrom(document.activeElement)
            if (fig) {
                e.preventDefault()
                open(fig)
            }
        }
    }

    document.addEventListener("click", onClick)
    document.addEventListener("keydown", onKey)
    root.addEventListener("close", onClose)
    return () => {
        document.removeEventListener("click", onClick)
        document.removeEventListener("keydown", onKey)
        close()
        root.removeEventListener("close", onClose)
    }
}
