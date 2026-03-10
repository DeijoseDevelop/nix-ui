import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, html } from "@deijose/nix-js";
import { Modal, createModal } from "../components/Modal";

describe("Modal", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders strictly via portal to document body when open", () => {
        const modalState = createModal();
        mount(Modal({ open: modalState.isOpen, children: "Modal Content" }), container);
        
        // Not open yet, should be null or empty
        expect(document.body.querySelector(".nix-modal-root")).toBeNull();
        
        // Open the modal
        modalState.open();
        
        // Portal appends to document.body, but nix-js portal might be a synchronous DOM append.
        const root = document.querySelector(".nix-modal-root");
        expect(root).not.toBeNull();
        expect(root?.textContent).toContain("Modal Content");
    });

    it("renders title and footer if provided", () => {
        const modalState = createModal();
        modalState.open();
        mount(Modal({ 
            open: modalState.isOpen, 
            title: "My Title",
            footer: html`<span>My Footer</span>`,
            children: "Content" 
        }), container);
        
        const root = document.querySelector(".nix-modal-root")!;
        expect(root.textContent).toContain("My Title");
        expect(root.textContent).toContain("My Footer");
    });

    it("closes when close button is clicked", () => {
        const onClose = vi.fn();
        const modalState = createModal();
        modalState.open();
        
        mount(Modal({ open: modalState.isOpen, onClose, children: "Content" }), container);
        
        const closeBtn = document.querySelector(".nix-modal-root button") as HTMLButtonElement;
        expect(closeBtn).not.toBeNull();
        
        closeBtn.click();
        expect(modalState.isOpen.value).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes when backdrop is clicked if closeOnBackdrop is true (default)", () => {
        const modalState = createModal();
        modalState.open();
        
        mount(Modal({ open: modalState.isOpen, children: "Content" }), container);
        
        const backdrop = document.querySelector(".nix-modal-backdrop") as HTMLDivElement;
        backdrop.click();
        
        expect(modalState.isOpen.value).toBe(false);
    });

    it("does not close on backdrop click if closeOnBackdrop is false", () => {
        const modalState = createModal();
        modalState.open();
        
        mount(Modal({ open: modalState.isOpen, closeOnBackdrop: false, children: "Content" }), container);
        
        const backdrop = document.querySelector(".nix-modal-backdrop") as HTMLDivElement;
        backdrop.click();
        
        expect(modalState.isOpen.value).toBe(true);
    });

    it("closes on Escape key press", () => {
        const modalState = createModal();
        modalState.open();
        
        mount(Modal({ open: modalState.isOpen, children: "Content" }), container);
        
        const root = document.querySelector(".nix-modal-root") as HTMLDivElement;
        root.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        
        expect(modalState.isOpen.value).toBe(false);
    });
});
