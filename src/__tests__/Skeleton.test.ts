import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Skeleton } from "../components/Skeleton";

describe("Skeleton", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders correct number of items", () => {
        mount(Skeleton({ count: 3 }), container);
        const skeletons = container.querySelectorAll("[aria-hidden='true']");
        expect(skeletons.length).toBe(3);
    });

    it("applies correct variant classes", () => {
        mount(Skeleton({ variant: "circular" }), container);
        const skeleton = container.querySelector("[aria-hidden='true']");
        expect(skeleton?.className).toContain("rounded-full");
    });
});
