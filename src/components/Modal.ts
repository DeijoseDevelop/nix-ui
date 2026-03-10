import { html, signal, Signal, portal, transition } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
    open: Signal<boolean>;
    onClose?: () => void;
    size?: ModalSize;
    title?: string;
    closeOnBackdrop?: boolean;
    closeButton?: boolean;
    class?: string;
    style?: string;
    children: NixUIChildren;
    footer?: NixUIChildren;
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const MODAL_SIZE: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[calc(100vw-2rem)]",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Modal(props: ModalProps): NixTemplate {
    const {
        open,
        onClose,
        size = "md",
        title,
        closeOnBackdrop = true,
        closeButton = true,
        class: className,
        style,
        children,
        footer,
    } = props;

    const close = () => {
        open.value = false;
        onClose?.();
    };

    const handleBackdrop = (e: Event) => {
        if (!closeOnBackdrop) return;
        const target = e.target as HTMLElement;
        // Nix.js delegates clicks properly, but e.target will be the specific node clicked
        // Validate if it's either the full flex container or the dark absolute backdrop
        if (target.closest(".nix-modal-panel")) return; // Prevent closing when clicking inside the panel
        if (target.classList.contains("nix-modal-root") || target.classList.contains("nix-modal-backdrop")) {
            close();
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
    };

    return portal(
        html`
            <div style="display: contents;">
                ${transition(
                    () =>
                        open.value
                            ? html`
                                  <div
                                      class="nix-modal-root fixed inset-0 z-50 flex items-center justify-center p-4"
                                      @click=${handleBackdrop}
                                      @keydown=${handleKeydown}
                                  >
                                      <!-- Backdrop (sin blur para evitar GPU lag) -->
                                      <div class="nix-modal-backdrop absolute inset-0 bg-black/60"></div>

                                      <!-- Panel -->
                                      <div
                                          class=${cx(
                                              "nix-modal-panel relative w-full rounded-nix-xl bg-nix-bg shadow-nix-xl overflow-hidden",
                                              MODAL_SIZE[size],
                                              className,
                                          )}
                                          role="dialog"
                                          aria-modal="true"
                                      >
                                          ${title || closeButton
                                              ? html`
                                                    <div class="flex items-center justify-between px-5 py-4 border-b border-nix-border">
                                                        ${title
                                                            ? html`<h3 class="text-lg font-semibold text-nix-text">${title}</h3>`
                                                            : html`<div></div>`}
                                                        ${closeButton
                                                            ? html`
                                                                  <button
                                                                      @click=${close}
                                                                      class="p-1 rounded-nix-md text-nix-text-muted hover:text-nix-text hover:bg-nix-surface transition-colors cursor-pointer"
                                                                      aria-label="Close"
                                                                  >
                                                                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                                                      </svg>
                                                                  </button>
                                                              `
                                                            : ""}
                                                    </div>
                                                `
                                              : ""}

                                          <div class="px-5 py-4 overflow-y-auto max-h-[60vh]">
                                              ${children}
                                          </div>

                                          ${footer
                                              ? html`
                                                    <div class="px-5 py-3 border-t border-nix-border bg-nix-surface flex items-center justify-end gap-2">
                                                        ${footer}
                                                    </div>
                                                `
                                              : ""}
                                      </div>
                                  </div>
                              `
                            : null,
                    {
                        name: "modal",
                        appear: true,
                        duration: 200,
                        onBeforeEnter: (el) => {
                            if (style) {
                                const panel = el.querySelector(".nix-modal-panel");
                                if (panel) panel.setAttribute("style", style);
                            }
                        },
                    },
                )}
            </div>
        `,
    );
}

/**
 * Imperative helper to open/close a modal via signals.
 *
 * @example
 *   const modal = createModal();
 *   Modal({ open: modal.isOpen, onClose: () => modal.close(), ... })
 *   button.onClick = () => modal.open();
 */
export function createModal() {
    const isOpen = signal(false);
    return {
        isOpen,
        open: () => (isOpen.value = true),
        close: () => (isOpen.value = false),
        toggle: () => (isOpen.value = !isOpen.value),
    };
}
