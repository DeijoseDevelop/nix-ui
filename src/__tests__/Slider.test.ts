import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Slider } from "../components/Slider";

describe("Slider", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders correctly with default values", () => {
        mount(Slider({}), container);
        const input = container.querySelector("input[type='range']") as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.min).toBe("0");
        expect(input.max).toBe("100");
    });

    it("fires onChange when value changes", () => {
        const onChange = vi.fn();
        mount(Slider({ onChange }), container);
        const input = container.querySelector("input[type='range']") as HTMLInputElement;
        
        input.value = "50";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        expect(onChange).toHaveBeenCalledWith(50, expect.any(Event));
    });

    it("respects disabled state", () => {
        mount(Slider({ disabled: true }), container);
        const input = container.querySelector("input[type='range']") as HTMLInputElement;
        expect(input.hasAttribute("disabled")).toBe(true);
    });
});
