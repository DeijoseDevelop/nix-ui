import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Input } from "../components/Input";

describe("Input", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders default input", () => {
        mount(Input({}), container);
        const input = container.querySelector("input")!;
        expect(input).not.toBeNull();
        expect(input.type).toBe("text");
        expect(input.className).toContain("px-3"); // md size
    });

    it("renders with label", () => {
        mount(Input({ label: "Username" }), container);
        const label = container.querySelector("label");
        expect(label).not.toBeNull();
        expect(label?.textContent).toBe("Username");
    });

    it("binds static value", () => {
        mount(Input({ value: "John Doe" }), container);
        const input = container.querySelector("input")!;
        expect(input.value).toBe("John Doe");
    });

    it("renders custom type and size", () => {
        mount(Input({ type: "password", size: "lg" }), container);
        const input = container.querySelector("input")!;
        expect(input.type).toBe("password");
        expect(input.className).toContain("px-4");
    });

    it("handles onInput and onChange", () => {
        const onInput = vi.fn();
        const onChange = vi.fn();
        mount(Input({ onInput, onChange }), container);
        
        const input = container.querySelector("input")!;
        
        // Simular evento input
        input.value = "A";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        expect(onInput).toHaveBeenCalledWith("A", expect.any(Event));
        
        // Simular evento change
        input.dispatchEvent(new Event("change", { bubbles: true }));
        expect(onChange).toHaveBeenCalledWith("A", expect.any(Event));
    });

    it("displays error text and classes", () => {
        mount(Input({ error: "Invalid email" }), container);
        
        const input = container.querySelector("input")!;
        expect(input.className).toContain("border-nix-error");
        
        const errSpan = container.querySelector("span.text-nix-error");
        expect(errSpan).not.toBeNull();
        expect(errSpan?.textContent).toBe("Invalid email");
    });

    it("handles disabled state", () => {
        mount(Input({ disabled: true, value: "Text" }), container);
        const input = container.querySelector("input")!;
        expect(input.disabled).toBe(true);
        expect(input.className).toContain("opacity-50");
    });
});
