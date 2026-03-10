import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, html, nextTick } from "@deijose/nix-js";
import { Tabs } from "../components/Tabs";

describe("Tabs", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    const tabs = [
        { key: "tab1", label: "Tab 1", content: () => html`<p>Content 1</p>` },
        { key: "tab2", label: "Tab 2", content: () => html`<p>Content 2</p>` },
        { key: "tab3", label: "Tab 3", content: () => html`<p>Content 3</p>`, disabled: true },
    ];

    it("renders tabs and default content", () => {
        mount(Tabs({ tabs }), container);
        const buttons = container.querySelectorAll('button[role="tab"]');
        expect(buttons.length).toBe(3);
        
        // Defaults to first tab
        expect(container.textContent).toContain("Content 1");
        expect(container.textContent).not.toContain("Content 2");
        expect(buttons[0].getAttribute("aria-selected")).toBe("true");
    });

    it("respects defaultTab prop", () => {
        mount(Tabs({ tabs, defaultTab: "tab2" }), container);
        expect(container.textContent).not.toContain("Content 1");
        expect(container.textContent).toContain("Content 2");
        
        const buttons = container.querySelectorAll('button[role="tab"]');
        expect(buttons[0].getAttribute("aria-selected")).toBe("false");
        expect(buttons[1].getAttribute("aria-selected")).toBe("true");
    });

    it("switches tabs on click and calls onChange", async () => {
        const onChange = vi.fn();
        mount(Tabs({ tabs, onChange }), container);
        
        const buttons = container.querySelectorAll('button[role="tab"]') as NodeListOf<HTMLButtonElement>;
        
        buttons[1].click();
        await nextTick();
        
        expect(container.textContent).toContain("Content 2");
        expect(onChange).toHaveBeenCalledWith("tab2");
    });

    it("does not switch if disabled", async () => {
        const onChange = vi.fn();
        mount(Tabs({ tabs, onChange }), container);
        
        const buttons = container.querySelectorAll('button[role="tab"]') as NodeListOf<HTMLButtonElement>;
        
        expect(buttons[2].disabled).toBe(true);
        buttons[2].click();
        await nextTick();
        
        expect(container.textContent).not.toContain("Content 3");
        expect(onChange).not.toHaveBeenCalled();
    });

    it("renders pills variant", () => {
        mount(Tabs({ tabs, variant: "pills" }), container);
        const list = container.querySelector('div[role="tablist"]');
        expect(list?.className).toContain("bg-nix-surface");
        
        const buttons = container.querySelectorAll('button[role="tab"]');
        expect(buttons[0].className).toContain("bg-nix-primary");
    });

    it("renders bordered variant", () => {
        mount(Tabs({ tabs, variant: "bordered" }), container);
        const list = container.querySelector('div[role="tablist"]');
        expect(list?.className).toContain("border-b");
        
        const buttons = container.querySelectorAll('button[role="tab"]');
        expect(buttons[0].className).toContain("border-b-nix-bg");
    });
});
