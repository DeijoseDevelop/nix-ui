import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@deijose/nix-js";
import { Avatar } from "../components/Avatar";

describe("Avatar", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders image if src is provided", () => {
        mount(Avatar({ src: "http://example.com/avatar.png", alt: "User Avatar" }), container);
        const img = container.querySelector("img");
        expect(img).not.toBeNull();
        expect(img?.src).toBe("http://example.com/avatar.png");
        expect(img?.alt).toBe("User Avatar");
    });

    it("renders initials if name is provided and no src", () => {
        mount(Avatar({ name: "John Doe" }), container);
        const img = container.querySelector("img");
        expect(img).toBeNull();
        const textContainer = container.querySelector("div > div.font-semibold");
        expect(textContainer).not.toBeNull();
        expect(textContainer?.textContent?.trim()).toBe("JD");
    });

    it("renders fallback icon if no src and no name provided", () => {
        mount(Avatar({ }), container);
        const img = container.querySelector("img");
        expect(img).toBeNull();
        const svg = container.querySelector("svg");
        expect(svg).not.toBeNull();
    });

    it("applies correct size classes", () => {
        mount(Avatar({ size: "xl" }), container);
        const el = container.firstElementChild as HTMLElement;
        expect(el.className).toContain("w-16 h-16");
    });

    it("renders status indicator", () => {
        mount(Avatar({ status: "online", size: "md" }), container);
        const statusEl = container.querySelector("span.absolute.bottom-0.right-0");
        expect(statusEl).not.toBeNull();
        expect(statusEl?.className).toContain("bg-nix-success");
        expect(statusEl?.className).toContain("w-2.5 h-2.5"); // md status size
    });
});
