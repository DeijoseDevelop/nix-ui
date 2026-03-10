import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@deijose/nix-js";
import { Spinner } from "../components/Spinner";

describe("Spinner", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders default border spinner", () => {
        mount(Spinner({}), container);
        const spinnerNodes = container.querySelectorAll("span.animate-nix-spin");
        expect(spinnerNodes.length).toBe(1);
    });

    it("renders label if provided", () => {
        mount(Spinner({ label: "Loading please wait" }), container);
        expect(container.textContent).toContain("Loading please wait");
        const statusDiv = container.querySelector('div[role="status"]');
        expect(statusDiv?.getAttribute("aria-label")).toBe("Loading please wait");
    });

    it("renders pulse variant", () => {
        mount(Spinner({ variant: "pulse" }), container);
        const pulseNodes = container.querySelectorAll("span.animate-nix-pulse");
        expect(pulseNodes.length).toBe(1);
    });

    it("renders dots variant", () => {
        mount(Spinner({ variant: "dots" }), container);
        const dotNodes = container.querySelectorAll("span.animate-nix-pulse");
        expect(dotNodes.length).toBe(3);
    });

    it("applies different sizes", () => {
        mount(Spinner({ size: "lg", variant: "border" }), container);
        const node = container.querySelector("span.animate-nix-spin");
        expect(node?.className).toContain("w-8 h-8");
    });

    it("applies custom color", () => {
        mount(Spinner({ color: "text-red-500" }), container);
        const node = container.querySelector("span.animate-nix-spin");
        expect(node?.className).toContain("text-red-500");
    });
});
