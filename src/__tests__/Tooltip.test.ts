import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@deijose/nix-js";
import { Tooltip } from "../components/Tooltip";

describe("Tooltip", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders children elements", () => {
        mount(Tooltip({ text: "Information here", children: "Hover me" }), container);
        const wrapper = container.firstElementChild as HTMLElement;
        expect(wrapper.textContent).toContain("Hover me");
    });

    it("renders tooltip text", () => {
        mount(Tooltip({ text: "Information here", children: "Hover me" }), container);
        const tooltip = container.querySelector('div[role="tooltip"]');
        expect(tooltip).not.toBeNull();
        expect(tooltip?.textContent).toContain("Information here");
    });

    it("applies default position (top)", () => {
        mount(Tooltip({ text: "Information here", children: "Hover me" }), container);
        const tooltip = container.querySelector('div[role="tooltip"]') as HTMLElement;
        expect(tooltip.className).toContain("bottom-full"); // That's how 'top' is positioned
    });

    it("applies bottom position", () => {
        mount(Tooltip({ text: "Information here", position: "bottom", children: "Hover me" }), container);
        const tooltip = container.querySelector('div[role="tooltip"]') as HTMLElement;
        expect(tooltip.className).toContain("top-full");
    });

    it("has required classes for hover interaction", () => {
        mount(Tooltip({ text: "Info", children: "Hover me" }), container);
        const wrapper = container.firstElementChild as HTMLElement;
        expect(wrapper.className).toContain("group");
        
        const tooltip = container.querySelector('div[role="tooltip"]') as HTMLElement;
        expect(tooltip.className).toContain("opacity-0");
        expect(tooltip.className).toContain("group-hover:opacity-100");
    });
});
