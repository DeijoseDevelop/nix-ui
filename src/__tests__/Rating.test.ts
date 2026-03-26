import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Rating } from "../components/Rating";

describe("Rating", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders correct number of stars", () => {
        mount(Rating({ max: 5, value: 3 }), container);
        const inputs = container.querySelectorAll("input[type='radio']");
        expect(inputs.length).toBe(5);
    });

    it("fires onChange when a star is clicked", () => {
        const onChange = vi.fn();
        mount(Rating({ max: 5, value: 0, onChange }), container);
        
        const input4 = container.querySelector("input[value='4']") as HTMLInputElement;
        expect(input4).not.toBeNull();
        
        input4.click();
        expect(onChange).toHaveBeenCalledWith(4);
    });
});
