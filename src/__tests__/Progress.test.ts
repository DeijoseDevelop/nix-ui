import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@deijose/nix-js";
import { Progress } from "../components/Progress";

describe("Progress", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders correctly with given value", () => {
        mount(Progress({ value: 50 }), container);
        const progressbar = container.querySelector("[role='progressbar']");
        expect(progressbar).not.toBeNull();
        expect(progressbar?.getAttribute("aria-valuenow")).toBe("50");
    });
});
