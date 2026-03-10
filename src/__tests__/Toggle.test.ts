import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Toggle } from "../components/Toggle";

describe("Toggle", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders un-checked by default", () => {
        mount(Toggle({}), container);
        const button = container.querySelector('button[role="switch"]')!;
        expect(button.getAttribute("aria-checked")).toBe("false");
        expect(button.className).toContain("bg-nix-border");
    });

    it("renders label", () => {
        mount(Toggle({ label: "Enable Feature" }), container);
        const label = container.querySelector("span.text-sm")!;
        expect(label.textContent).toBe("Enable Feature");
    });

    it("binds to static checked value", () => {
        mount(Toggle({ checked: true }), container);
        const button = container.querySelector('button[role="switch"]')!;
        expect(button.getAttribute("aria-checked")).toBe("true");
        expect(button.className).toContain("bg-nix-primary");
    });

    it("handles onChange", () => {
        const onChange = vi.fn();
        mount(Toggle({ onChange }), container);
        const button = container.querySelector('button[role="switch"]') as HTMLButtonElement;
        
        button.click();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("renders error message and classes", () => {
        mount(Toggle({ error: "Cannot be toggled now" }), container);
        
        const button = container.querySelector('button[role="switch"]')!;
        expect(button.className).toContain("ring-nix-error/50");
        
        const errSpan = container.querySelector("span.text-nix-error");
        expect(errSpan).not.toBeNull();
        expect(errSpan?.textContent).toBe("Cannot be toggled now");
    });

    it("handles disabled state", () => {
        mount(Toggle({ disabled: true }), container);
        const button = container.querySelector('button[role="switch"]') as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it("toggles when label is clicked", () => {
        const onChange = vi.fn();
        mount(Toggle({ label: "Label Text", onChange }), container);
        
        const label = container.querySelector("span.text-sm") as HTMLSpanElement;
        label.click();
        
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
    });
});
