import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Textarea } from "../components/Textarea";

describe("Textarea", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders default textarea", () => {
        mount(Textarea({}), container);
        const textarea = container.querySelector("textarea")!;
        expect(textarea).not.toBeNull();
        expect(Number(textarea.rows)).toBe(4); // Default rows
    });

    it("renders with label", () => {
        mount(Textarea({ label: "Comments" }), container);
        const label = container.querySelector("label");
        expect(label).not.toBeNull();
        expect(label?.textContent).toBe("Comments");
    });

    it("binds static value", () => {
        mount(Textarea({ value: "Some text" }), container);
        const textarea = container.querySelector("textarea")!;
        expect(textarea.value).toBe("Some text");
    });

    it("respects rows prop", () => {
        mount(Textarea({ rows: 10 }), container);
        const textarea = container.querySelector("textarea")!;
        expect(Number(textarea.rows)).toBe(10);
    });

    it("handles onInput and onBlur", () => {
        const onInput = vi.fn();
        const onBlur = vi.fn();
        mount(Textarea({ onInput, onBlur }), container);
        
        const textarea = container.querySelector("textarea")!;
        
        textarea.value = "New text";
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        expect(onInput).toHaveBeenCalledWith("New text", expect.any(Event));
        
        textarea.dispatchEvent(new Event("blur", { bubbles: true }));
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("displays error text and classes", () => {
        mount(Textarea({ error: "Too long" }), container);
        
        const textarea = container.querySelector("textarea")!;
        expect(textarea.className).toContain("border-nix-error");
        
        const errSpan = container.querySelector("span.text-nix-error");
        expect(errSpan).not.toBeNull();
        expect(errSpan?.textContent).toBe("Too long");
    });

    it("handles disabled state", () => {
        mount(Textarea({ disabled: true }), container);
        const textarea = container.querySelector("textarea")!;
        expect(textarea.disabled).toBe(true);
        expect(textarea.className).toContain("opacity-50");
    });
});
