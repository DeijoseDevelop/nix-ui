import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, signal, nextTick } from "@deijose/nix-js";
import { Drawer } from "../components/Drawer";

describe("Drawer", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders content", () => {
        const open = signal(false);
        mount(Drawer({ open: open, onClose: () => { }, children: "Drawer Content" }), container);
        expect(container.textContent).toContain("Drawer Content");
    });

    it("respects open signal", async () => {
        const open = signal(false);
        mount(Drawer({ open: open, onClose: () => { }, title: "Test Drawer", children: "Content" }), container);

        open.value = true;
        await nextTick();

        expect(container.textContent).toContain("Test Drawer");
    });

    it("fires onClose when close button is clicked", () => {
        const open = signal(true);
        const onClose = vi.fn();
        mount(Drawer({ open: open, onClose, children: "Content" }), container);

        // Find the close button (the one wrapping the SVG icon)
        const closeBtn = container.querySelector("button");
        expect(closeBtn).not.toBeNull();

        closeBtn!.click();
        expect(onClose).toHaveBeenCalled();
    });
});
