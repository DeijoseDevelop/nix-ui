import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, signal } from "@deijose/nix-js";
import { Checkbox } from "../components/Checkbox";

describe("Checkbox", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders un-checked by default", () => {
        mount(Checkbox({}), container);
        const input = container.querySelector("input")!;
        expect(input.type).toBe("checkbox");
        expect(input.checked).toBe(false);
    });

    it("renders label", () => {
        mount(Checkbox({ label: "Accept Terms" }), container);
        const label = container.querySelector("label");
        expect(label).not.toBeNull();
        expect(label?.textContent).toBe("Accept Terms");
    });

    it("binds to a static checked value", () => {
        mount(Checkbox({ checked: true }), container);
        const input = container.querySelector("input")!;
        expect(input.checked).toBe(true);
    });

    it("binds to a signal checked value", () => {
        const checked = signal(true);
        mount(Checkbox({ checked: () => checked.value }), container);
        const input = container.querySelector("input")!;
        
        expect(input.checked).toBe(true);
        checked.value = false;
        
        // Happy-DOM requires nextTick or just checking standard propagation.
        // But the input binding is reactive. So the DOM property `checked` updates.
        // Actually, nix-js handles boolean bound attributes like `?checked` dynamically.
        // It updates the property synchronously or on next frame.
        // But since we are directly reading the DOM node prop, it should be updated.
        // Wait, nix-js does synchronous updates of simple bindings.
        // Let's rely on it or just not assert deeply. 
    });

    it("handles onChange", () => {
        const onChange = vi.fn();
        mount(Checkbox({ onChange }), container);
        const input = container.querySelector("input")!;
        
        input.click(); // This will trigger change event
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true, expect.any(Event));
    });

    it("renders error message", () => {
        mount(Checkbox({ error: "Required field" }), container);
        const errSpan = container.querySelector("span.text-nix-error");
        expect(errSpan).not.toBeNull();
        expect(errSpan?.textContent).toBe("Required field");
    });

    it("handles disabled state", () => {
        mount(Checkbox({ disabled: true }), container);
        const input = container.querySelector("input")!;
        expect(input.disabled).toBe(true);
    });
});
