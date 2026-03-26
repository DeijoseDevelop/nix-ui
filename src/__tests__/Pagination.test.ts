import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Pagination } from "../components/Pagination";

describe("Pagination", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders correct number of pages", () => {
        mount(Pagination({ currentPage: 1, totalPages: 5 }), container);
        const buttons = container.querySelectorAll("button");
        expect(buttons.length).toBeGreaterThanOrEqual(5);
        expect(container.textContent).toContain("1");
        expect(container.textContent).toContain("5");
    });

    it("fires onPageChange when clicking a page", () => {
        const onPageChange = vi.fn();
        mount(Pagination({ currentPage: 1, totalPages: 5, onPageChange }), container);
        
        // Click page 2
        const page2Btn = Array.from(container.querySelectorAll("button")).find(b => b.textContent?.includes("2"));
        // Need to click inner div or button depending on nix-js structure padding
        page2Btn!.click();
        expect(onPageChange).toHaveBeenCalledWith(2);
    });
});
