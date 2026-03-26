import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@deijose/nix-js";
import { DataTable } from "../components/DataTable";

describe("DataTable", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" }
    ];

    const data = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];

    it("renders table headers and rows", () => {
        mount(DataTable({ columns, data }), container);
        expect(container.textContent).toContain("ID");
        expect(container.textContent).toContain("Name");
        expect(container.textContent).toContain("Alice");
        expect(container.textContent).toContain("Bob");
    });

    it("renders empty state when data is empty", () => {
        mount(DataTable({ columns, data: [] }), container);
        expect(container.textContent).toContain("No data available");
    });
});
