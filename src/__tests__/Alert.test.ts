import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, nextTick } from "@deijose/nix-js";
import { Alert } from "../components/Alert";

describe("Alert", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders children and default variant", () => {
        mount(Alert({ children: "Hello Alert" }), container);
        const el = container.querySelector("div[role='alert']")!;
        expect(el).not.toBeNull();
        expect(el.textContent).toContain("Hello Alert");
        // default variant is info
        expect(el.className).toContain("bg-nix-info-light");
    });

    it("renders title", () => {
        mount(Alert({ title: "My Title", children: "Content" }), container);
        const titleEl = container.querySelector("h4")!;
        expect(titleEl).not.toBeNull();
        expect(titleEl.textContent).toBe("My Title");
    });

    it("renders different variants", () => {
        mount(Alert({ variant: "success", children: "Success" }), container);
        const el = container.querySelector("div[role='alert']")!;
        expect(el.className).toContain("bg-nix-success-light");
    });

    it("renders icon by default and can hide it", () => {
        mount(Alert({ children: "Content" }), container);
        expect(container.querySelector("svg")).not.toBeNull();

        const container2 = document.createElement("div");
        mount(Alert({ icon: false, children: "Content" }), container2);
        expect(container2.querySelector("svg")).toBeNull();
    });

    it("is not dismissible by default", () => {
        mount(Alert({ children: "Content" }), container);
        const button = container.querySelector("button");
        expect(button).toBeNull();
    });

    it("handles dismiss click", async () => {
        const onDismiss = vi.fn();
        mount(Alert({ dismissible: true, onDismiss, children: "Content" }), container);
        
        const button = container.querySelector("button")!;
        expect(button).not.toBeNull();
        
        button.click();
        await nextTick();
        
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
