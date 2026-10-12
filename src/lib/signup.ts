/**
 * The signup sheet (Q25, Q31): opening it from the cover's "+", checking the
 * name and email, and sending to the form service — without leaving the page.
 *
 * Sent with fetch and `Accept: application/json`, which both Formspree and
 * Web3Forms answer with JSON instead of redirecting to their own thank-you
 * page. With JS off the <form> still has its `action`, so it posts the
 * ordinary way and the service shows its own confirmation.
 */

export function initSignup(): () => void {
    const dialog = document.getElementById("tc-signup") as HTMLDialogElement | null
    if (!dialog || typeof dialog.showModal !== "function") return () => {}
    const form = dialog.querySelector<HTMLFormElement>("form")!
    const name = form.querySelector<HTMLInputElement>('input[name="name"]')!
    const email = form.querySelector<HTMLInputElement>('input[name="email"]')!
    const status = form.querySelector<HTMLElement>("[data-status]")!
    const send = form.querySelector<HTMLButtonElement>("[data-signup-send]")!
    const endpoint = form.dataset.endpoint || ""
    let opener: HTMLElement | null = null

    const say = (text: string, tone: "ok" | "error" | "" = "") => {
        status.textContent = text
        if (tone) status.dataset.tone = tone
        else delete status.dataset.tone
    }

    const open = (e: Event) => {
        const trigger = (e.target as HTMLElement).closest<HTMLElement>("[data-signup-open]")
        if (!trigger) return
        e.preventDefault()
        opener = trigger
        dialog.showModal()
        name.focus()
    }
    // Focus goes back to the "+" it came from, so a keyboard user is where
    // they were on the cover. Run by close() and again by the dialog's own
    // "close" event (Escape); the second run finds nothing to do.
    const onClose = () => {
        opener?.focus()
        opener = null
    }
    const close = () => {
        dialog.close()
        onClose()
    }

    // A click on the backdrop (the dialog element itself, outside the sheet)
    // closes it, like the lightbox.
    const onDialogClick = (e: MouseEvent) => {
        if (e.target === dialog) close()
    }

    // Each required field says what it needs, under itself (Q31).
    const problem = (field: HTMLInputElement): string => {
        const value = field.value.trim()
        if (field === name) return value ? "" : "Add a name, so we know who to expect."
        if (!value) return "Add an email, so we can write back."
        return field.checkValidity() ? "" : "That email looks incomplete. Check for the @ and the part after it."
    }
    const check = (field: HTMLInputElement): boolean => {
        const error = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`)!
        const message = problem(field)
        error.id = `tc-signup-${field.name}-error`
        error.textContent = message
        error.hidden = !message
        field.setAttribute("aria-invalid", message ? "true" : "false")
        if (message) field.setAttribute("aria-describedby", error.id)
        else field.removeAttribute("aria-describedby")
        return !message
    }

    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault()
        say("")
        const nameOk = check(name)
        const emailOk = check(email)
        if (!nameOk || !emailOk) {
            ;(nameOk ? email : name).focus()
            return
        }
        const data = new FormData(form)
        // The spam trap: a person never fills these in.
        if (data.get("_gotcha") || data.get("botcheck")) {
            say("Thank you — we'll write back.", "ok")
            return
        }
        data.delete("_gotcha")
        data.delete("botcheck")
        if (!endpoint) {
            say("Not connected yet — nothing was sent.", "error")
            return
        }
        send.disabled = true
        say("Sending…")
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            })
            const body = await res.json().catch(() => ({}))
            // Formspree answers { ok: true }, Web3Forms { success: true }.
            const ok = res.ok && body.ok !== false && body.success !== false
            if (!ok) throw new Error(String(body.message ?? body.error ?? res.status))
            form.reset()
            say("Thank you — we'll write back soon.", "ok")
        } catch {
            say("That didn't send. Check your connection and try again.", "error")
        } finally {
            send.disabled = false
        }
    }

    // Once a field has been flagged, it clears itself as soon as it is right.
    const onInput = (e: Event) => {
        const field = e.target as HTMLInputElement
        if ((field === name || field === email) && field.getAttribute("aria-invalid") === "true") check(field)
    }

    const closeBtn = form.querySelector<HTMLElement>("[data-signup-close]")
    document.addEventListener("click", open)
    closeBtn?.addEventListener("click", close)
    dialog.addEventListener("close", onClose)
    dialog.addEventListener("click", onDialogClick)
    form.addEventListener("submit", onSubmit)
    form.addEventListener("input", onInput)

    return () => {
        document.removeEventListener("click", open)
        closeBtn?.removeEventListener("click", close)
        dialog.removeEventListener("close", onClose)
        dialog.removeEventListener("click", onDialogClick)
        form.removeEventListener("submit", onSubmit)
        form.removeEventListener("input", onInput)
    }
}
