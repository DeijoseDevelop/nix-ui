import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { RadioGroup } from "../components/RadioGroup";

describe("RadioGroup", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    const options = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" }
    ];

    it("renders correctly with options", () => {
        mount(RadioGroup({ name: "testGroup", options }), container);
        const inputs = container.querySelectorAll("input[type='radio']");
        expect(inputs.length).toBe(2);
        expect(container.textContent).toContain("Option 1");
    });

    it("handles selection changes", () => {
        const onChange = vi.fn();
        mount(RadioGroup({ name: "testGroup", options, onChange }), container);
        const input2 = container.querySelectorAll("input[type='radio']")[1] as HTMLInputElement;
        
        input2.click();
        expect(onChange).toHaveBeenCalledWith("2", expect.any(Event));
    });

    it("respects disabled state on option", () => {
        const disabledOpts = [{ label: "Opt", value: "1", disabled: true }];
        mount(RadioGroup({ name: "testGroup", options: disabledOpts }), container);
        const inputs = container.querySelectorAll("input[type='radio']");
        expect(inputs[0].hasAttribute("disabled")).toBe(true);
    });
});
