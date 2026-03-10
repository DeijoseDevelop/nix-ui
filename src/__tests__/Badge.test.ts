import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@deijose/nix-js";
import { Badge } from "../components/Badge";

describe("Badge", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders children correctly", () => {
        mount(Badge({ children: "Status" }), container);
        expect(container.textContent).toContain("Status");
    });

    it("applies default variant and size", () => {
        mount(Badge({ children: "Status" }), container);
        const el = container.firstElementChild as HTMLElement;
        expect(el.className).toContain("bg-nix-surface"); // default variant
        expect(el.className).toContain("px-2"); // md size
    });

    it("applies different variants", () => {
        mount(Badge({ variant: "success", children: "Success" }), container);
        const el = container.firstElementChild as HTMLElement;
        expect(el.className).toContain("bg-nix-success-light");
    });

    it("applies different sizes", () => {
        mount(Badge({ size: "lg", children: "Large" }), container);
        const el = container.firstElementChild as HTMLElement;
        expect(el.className).toContain("px-2.5");
    });

    it("renders as pill", () => {
        mount(Badge({ pill: true, children: "Pill" }), container);
        const el = container.firstElementChild as HTMLElement;
        expect(el.className).toContain("rounded-full");
    });

    it("renders dot with correct color based on variant", () => {
        mount(Badge({ dot: true, variant: "error", children: "Error" }), container);
        const dotEl = container.querySelector("span > span"); // Inner span is the dot
        expect(dotEl).not.toBeNull();
        expect(dotEl?.className).toContain("bg-nix-error");
    });
});
