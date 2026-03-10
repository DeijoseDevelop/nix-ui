import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, signal, nextTick } from "@deijose/nix-js";
import { Button } from "../components/Button";

describe("Button", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders children correctly", () => {
        mount(Button({ children: "Click Me" }), container);
        expect(container.textContent).toContain("Click Me");
    });

    it("applies default variant and size", () => {
        mount(Button({ children: "Click Me" }), container);
        const btn = container.querySelector("button")!;
        expect(btn.className).toContain("bg-nix-primary");
        expect(btn.className).toContain("px-4"); // md size
    });

    it("fires onClick event when not disabled or loading", () => {
        const onClick = vi.fn();
        mount(Button({ onClick, children: "Click Me" }), container);
        const btn = container.querySelector("button")!;
        
        btn.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not fire onClick when disabled", () => {
        const onClick = vi.fn();
        mount(Button({ disabled: true, onClick, children: "Click Me" }), container);
        const btn = container.querySelector("button")!;
        
        expect(btn.disabled).toBe(true);
        btn.click();
        expect(onClick).not.toHaveBeenCalled();
    });

    it("does not fire onClick when loading", () => {
        const onClick = vi.fn();
        mount(Button({ loading: true, onClick, children: "Click Me" }), container);
        const btn = container.querySelector("button")!;
        
        expect(btn.disabled).toBe(true); // Loading disables the button
        btn.click();
        expect(onClick).not.toHaveBeenCalled();
    });

    it("renders loading spinner when loading is true", () => {
        mount(Button({ loading: true, children: "Click Me" }), container);
        const spinner = container.querySelector("span.animate-nix-spin");
        expect(spinner).not.toBeNull();
    });

    it("reacts to signal props for disabled and loading", async () => {
        const isDisabled = signal(false);
        const isLoading = signal(false);
        const onClick = vi.fn();

        mount(Button({ disabled: isDisabled, loading: isLoading, onClick, children: "Click Me" }), container);
        const btn = container.querySelector("button")!;
        
        expect(btn.disabled).toBe(false);
        btn.click();
        expect(onClick).toHaveBeenCalledTimes(1);

        // Update disabled signal
        isDisabled.value = true;
        await nextTick();
        
        expect(btn.disabled).toBe(true);
        btn.click();
        expect(onClick).toHaveBeenCalledTimes(1); // not called again

        // Update loading signal
        isDisabled.value = false;
        isLoading.value = true;
        await nextTick();
        
        expect(btn.disabled).toBe(true);
        const spinner = container.querySelector("span.animate-nix-spin");
        expect(spinner).not.toBeNull();
    });
});
