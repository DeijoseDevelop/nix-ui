import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Select } from "../components/Select";

describe("Select", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3", disabled: true },
    ];

    it("renders options correctly", () => {
        mount(Select({ options }), container);
        const optNodes = container.querySelectorAll("option");
        expect(optNodes.length).toBe(3);
        expect(optNodes[0].value).toBe("1");
        expect(optNodes[0].textContent).toBe("Option 1");
        expect(optNodes[2].disabled).toBe(true);
    });

    it("renders placeholder first if provided", () => {
        mount(Select({ options, placeholder: "Select one..." }), container);
        const optNodes = container.querySelectorAll("option");
        expect(optNodes.length).toBe(4);
        expect(optNodes[0].value).toBe("");
        expect(optNodes[0].textContent).toBe("Select one...");
        expect(optNodes[0].disabled).toBe(true);
        expect(optNodes[0].selected).toBe(true);
    });

    it("renders label", () => {
        mount(Select({ options, label: "My Select" }), container);
        const label = container.querySelector("label");
        expect(label).not.toBeNull();
        expect(label?.textContent).toBe("My Select");
    });

    it("binds static value correctly", () => {
        mount(Select({ options, value: "2" }), container);
        const select = container.querySelector("select")!;
        expect(select.value).toBe("2");
    });

    it("handles onChange", () => {
        const onChange = vi.fn();
        mount(Select({ options, onChange }), container);
        
        const select = container.querySelector("select")!;
        select.value = "2";
        select.dispatchEvent(new Event("change", { bubbles: true }));
        
        expect(onChange).toHaveBeenCalledWith("2", expect.any(Event));
    });

    it("displays error with classes", () => {
        mount(Select({ options, error: "Must select a valid option" }), container);
        const select = container.querySelector("select")!;
        expect(select.className).toContain("border-nix-error");
        
        const errSpan = container.querySelector("span.text-nix-error");
        expect(errSpan).not.toBeNull();
        expect(errSpan?.textContent).toBe("Must select a valid option");
    });

    it("handles disabled state", () => {
        mount(Select({ options, disabled: true }), container);
        const select = container.querySelector("select")!;
        expect(select.disabled).toBe(true);
        expect(select.className).toContain("opacity-50");
    });
});
