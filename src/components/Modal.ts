import { html, signal, Signal, portal, transition } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";
import { nixFocusTrap } from "../utils/a11y/nixFocusTrap";
import { nixFocusRestore } from "../utils/a11y/nixFocusRestore";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
    open: Signal<boolean>;
    onClose?: () => void;
    size?: ModalSize;
    title?: string;
    description?: string;
    closeOnBackdrop?: boolean;
    closeButton?: boolean;
    class?: string;
    style?: string;
    children: NixUIChildren;
    footer?: NixUIChildren;
    /** Allow focus trap (default: true) */
    trapFocus?: boolean;
    /** Restore focus on close (default: true) */
    restoreFocus?: boolean;
    /** Initial focus selector within modal (default: first focusable element) */
    initialFocus?: string;
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

let _modalId = 0;

export function Modal(props: ModalProps): NixTemplate {
    const {
        open,
        onClose,
        size = "md",
        title,
        description,
        closeOnBackdrop = true,
        closeButton = true,
        class: className,
        style,
        children,
        footer,
        trapFocus = true,
        restoreFocus = true,
        initialFocus,
    } = props;

    // Create stable IDs for ARIA
    const instanceId = _modalId++;
    const titleId = `nix-modal-title-${instanceId}`;
    const descriptionId = `nix-modal-description-${instanceId}`;

    // Focus management
    const focusRestore = nixFocusRestore({
        element: null,
        enabled: restoreFocus,
    });

    let focusTrap: ReturnType<typeof nixFocusTrap> | null = null;

    const close = () => {
        open.value = false;
        onClose?.();

        // Deactivate focus trap
        if (focusTrap) {
            focusTrap.deactivate();
            focusTrap = null;
        }

        // Restore focus
        if (restoreFocus) {
            setTimeout(() => focusRestore.restore(), 50);
        }
    };

    const handleBackdrop = (e: Event) => {
        if (!closeOnBackdrop) return;
        const target = e.target as HTMLElement;
        if (target.closest(".nix-modal-panel")) return;
        if (target.classList.contains("nix-modal-root") || target.classList.contains("nix-modal-backdrop")) {
            close();
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
    };

    // Setup focus trap when modal opens
    const setupFocusTrap = (panel: HTMLElement) => {
        if (!trapFocus) return;

        focusTrap = nixFocusTrap({
            container: panel,
            initialFocus,
        });

        focusTrap.activate();
    };

    // Capture focus before opening
    const captureTriggerFocus = () => {
        if (restoreFocus) {
            focusRestore.capture();
        }
    };

    return portal(
        html`
            <div style="display: contents;">
                ${() => {
                if (open.value) {
                    captureTriggerFocus();
                }
                return null;
            }}
                ${transition(
                () =>
                    open.value
                        ? html`
                            <div
                                class="nix-modal-root fixed inset-0 z-50 flex items-center justify-center p-4"
                                @click=${handleBackdrop}
                                @keydown=${handleKeydown}
                            >
                                <!-- Backdrop -->
                                <div class="nix-modal-backdrop absolute inset-0 bg-black/60" aria-hidden="true"></div>

                                <!-- Panel -->
                                <div
                                    class=${cx(
                            "nix-modal-panel relative w-full rounded-nix-xl bg-nix-bg shadow-nix-xl overflow-hidden",
                            MODAL_SIZE[size],
                            className,
                        )}
                                          role="dialog"
                                          aria-modal="true"
                                          aria-labelledby=${title ? titleId : undefined}
                                          aria-describedby=${description ? descriptionId : undefined}
                                      >
                                          ${title || closeButton
                                ? html`
                                                    <div class="flex items-center justify-between px-5 py-4 border-b border-nix-border">
                                                        ${title
                                        ? html`<h3 id=${titleId} class="text-lg font-semibold text-nix-text">${title}</h3>`
                                        : html`<div></div>`}
                                                        ${description
                                        ? html`<p id=${descriptionId} class="sr-only">${description}</p>`
                                        : ""}
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
                        // Setup focus trap after element is mounted
                        const panelEl = el.querySelector(".nix-modal-panel");
                        if (panelEl) {
                            setupFocusTrap(panelEl as HTMLElement);
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
