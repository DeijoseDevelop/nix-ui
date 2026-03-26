import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, signal, nextTick } from "@deijose/nix-js";
import { Dropdown } from "../components/Dropdown";

describe("Dropdown", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    const items = [
        { id: "1", label: "Item 1" },
        { id: "2", label: "Item 2", disabled: true }
    ];

    it("renders trigger and responds to click", async () => {
        mount(Dropdown({ 
            trigger: "Menu", 
            items
        }), container);
        
        expect(container.textContent).toContain("Menu");
        
        const trigger = container.querySelector("div.cursor-pointer") as HTMLElement;
        trigger.click();
        await nextTick();
        
        expect(container.textContent).toContain("Item 1");
    });
});
