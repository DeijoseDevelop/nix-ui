import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount, html } from "@deijose/nix-js";
import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";

describe("Card", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders card correctly", () => {
        mount(Card({ children: "Card Content" }), container);
        const card = container.firstElementChild as HTMLElement;
        expect(card).not.toBeNull();
        expect(card.className).toContain("rounded-nix-lg");
        expect(card.textContent).toContain("Card Content");
    });

    it("renders card with parts correctly", () => {
        const renderParts = () => html`
            ${Card({
                children: html`
                    ${CardHeader({ children: "Header" })}
                    ${CardBody({ children: "Body" })}
                    ${CardFooter({ children: "Footer" })}
                `
            })}
        `;

        mount(renderParts(), container);
        
        const cardClass = container.firstElementChild?.className;
        expect(cardClass).toContain("rounded-nix-lg");

        const nodes = container.querySelectorAll("div > div");
        expect(nodes.length).toBeGreaterThan(0);
        
        const text = container.textContent!;
        expect(text).toContain("Header");
        expect(text).toContain("Body");
        expect(text).toContain("Footer");
    });
});
