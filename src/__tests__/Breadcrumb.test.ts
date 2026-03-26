import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { Breadcrumb } from "../components/Breadcrumb";

describe("Breadcrumb", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Phone" }
    ];

    it("renders all items", () => {
        mount(Breadcrumb({ items }), container);
        expect(container.textContent).toContain("Home");
        expect(container.textContent).toContain("Products");
        expect(container.textContent).toContain("Phone");
    });

    it("truncates when exceeding maxItems", () => {
        mount(Breadcrumb({ items, maxItems: 2 }), container);
        // Should show Home, …, Phone
        expect(container.textContent).toContain("Home");
        expect(container.textContent).toContain("…");
        expect(container.textContent).not.toContain("Products");
    });
});
