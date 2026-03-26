import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { html, mount, nextTick } from "@deijose/nix-js";
import { Accordion } from "../components/Accordion";

describe("Accordion", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders items correctly", () => {
        const items = [
            { key: "1", title: "Item 1", content: () => html`<p>Content 1</p>` },
            { key: "2", title: "Item 2", content: () => html`<p>Content 2</p>` },
        ];

        mount(Accordion({ items }), container);
        expect(container.textContent).toContain("Item 1");
        expect(container.textContent).toContain("Item 2");
        expect(container.textContent).not.toContain("Content 1");
    });

    it("opens default items", () => {
        const items = [
            { key: "1", title: "Item 1", content: () => html`<p>Content 1</p>` },
            { key: "2", title: "Item 2", content: () => html`<p>Content 2</p>` },
        ];

        mount(Accordion({ items, defaultOpen: ["2"] }), container);
        expect(container.textContent).not.toContain("Content 1");
        expect(container.textContent).toContain("Content 2");
    });

    it("toggles items on click", async () => {
        const items = [
            { key: "1", title: "Item 1", content: () => html`<p>Content 1</p>` },
        ];

        mount(Accordion({ items }), container);
        const btn = container.querySelector("button")!;
        
        // Open
        btn.click();
        await nextTick();
        expect(container.textContent).toContain("Content 1");
        
        // Close
        btn.click();
        await nextTick();
        expect(container.textContent).not.toContain("Content 1");
    });

    it("handles multiple mode", async () => {
        const items = [
            { key: "1", title: "Item 1", content: () => html`<p>Content 1</p>` },
            { key: "2", title: "Item 2", content: () => html`<p>Content 2</p>` },
        ];

        mount(Accordion({ items, multiple: true }), container);
        const btns = container.querySelectorAll("button");
        
        btns[0].click();
        await nextTick();
        btns[1].click();
        await nextTick();
        
        expect(container.textContent).toContain("Content 1");
        expect(container.textContent).toContain("Content 2");
    });
    
    it("handles non-multiple mode (exclusive)", async () => {
        const items = [
            { key: "1", title: "Item 1", content: () => html`<p>Content 1</p>` },
            { key: "2", title: "Item 2", content: () => html`<p>Content 2</p>` },
        ];

        mount(Accordion({ items, multiple: false }), container);
        const btns = container.querySelectorAll("button");
        
        btns[0].click();
        await nextTick();
        expect(container.textContent).toContain("Content 1");
        
        btns[1].click();
        await nextTick();
        
        expect(container.textContent).not.toContain("Content 1");
        expect(container.textContent).toContain("Content 2");
    });

    it("respects disabled state", async () => {
        const items = [
            { key: "1", title: "Item 1", content: () => html`<p>Content 1</p>`, disabled: true },
        ];

        mount(Accordion({ items }), container);
        const btn = container.querySelector("button")!;
        
        // ?disabled sets the HTML attribute — check with hasAttribute for happy-dom compatibility
        expect(btn.hasAttribute("disabled")).toBe(true);
        btn.click();
        await nextTick();
        
        expect(container.textContent).not.toContain("Content 1");
    });
});
