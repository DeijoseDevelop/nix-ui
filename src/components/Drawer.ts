import { html } from "@deijose/nix-js";
import type { NixTemplate, Signal } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";
import { nixFocusTrap } from "../utils/a11y/nixFocusTrap";
import { nixFocusRestore } from "../utils/a11y/nixFocusRestore";

export interface DrawerProps {
    open: boolean | Signal<boolean>;
    title?: string;
    description?: string;
    position?: "left" | "right" | "top" | "bottom";
    size?: "sm" | "md" | "lg" | "xl" | "full";
    onClose: () => void;
    children: NixUIChildren;
    footer?: NixUIChildren;
    class?: string;
    hideCloseButton?: boolean;
    /** Allow focus trap (default: true) */
    trapFocus?: boolean;
    /** Restore focus on close (default: true) */
    restoreFocus?: boolean;
    /** Initial focus selector within drawer */
    initialFocus?: string;
}

let _drawerId = 0;

export function Drawer(props: DrawerProps): NixTemplate {
    const {
        open,
        title,
        description,
        position = "right",
        size = "md",
        onClose,
        children,
        footer,
        class: className,
        hideCloseButton = false,
        trapFocus = true,
        restoreFocus = true,
        initialFocus,
    } = props;

    const instanceId = _drawerId++;
    const titleId = `nix-drawer-title-${instanceId}`;
    const descriptionId = `nix-drawer-description-${instanceId}`;

    const isOpen = () => (typeof open === "function" ? (open as Signal<boolean>).value : open);

    // Focus management
    const focusRestore = nixFocusRestore({
        element: null,
        enabled: restoreFocus,
    });

    let focusTrap: ReturnType<typeof nixFocusTrap> | null = null;

    const handleClose = () => {
        onClose();

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

    // Capture focus before opening
    const captureTriggerFocus = () => {
        if (restoreFocus) {
            focusRestore.capture();
        }
    };

    // Dimensions based on position and size
    const sizeClasses: Record<string, Record<string, string>> = {
        left: { sm: "w-64", md: "w-80", lg: "w-96", xl: "w-[32rem]", full: "w-screen" },
        right: { sm: "w-64", md: "w-80", lg: "w-96", xl: "w-[32rem]", full: "w-screen" },
        top: { sm: "h-32", md: "h-64", lg: "h-96", xl: "h-[32rem]", full: "h-screen" },
        bottom: { sm: "h-32", md: "h-64", lg: "h-96", xl: "h-[32rem]", full: "h-screen" }
    };

    const posClasses: Record<string, string> = {
        left: "top-0 left-0 bottom-0 bg-nix-bg shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out border-r border-nix-border",
        right: "top-0 right-0 bottom-0 bg-nix-bg shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-nix-border",
        top: "top-0 left-0 right-0 bg-nix-bg shadow-2xl overflow-auto transform transition-transform duration-300 ease-in-out border-b border-nix-border",
        bottom: "bottom-0 left-0 right-0 bg-nix-bg shadow-2xl overflow-auto transform transition-transform duration-300 ease-in-out border-t border-nix-border"
    };

    const closedTransforms: Record<string, string> = {
        left: "-translate-x-full",
        right: "translate-x-full",
        top: "-translate-y-full",
        bottom: "translate-y-full"
    };

    return html`
        <div
            class="relative z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby=${title ? titleId : undefined}
            aria-describedby=${description ? descriptionId : undefined}
            @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen()) {
                e.preventDefault();
                handleClose();
            }
        }}
            show=${isOpen}
        >
            ${() => {
            if (isOpen()) {
                captureTriggerFocus();
            }
            return null;
        }}

            <!-- Backdrop -->
            <div
                class=${() => cx(
            "fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
            isOpen() ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
                @click=${handleClose}
                aria-hidden="true"
            ></div>

            <!-- Drawer Panel -->
            <div class="fixed inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 overflow-hidden">
                    <div class=${() => cx(
            position === "left" || position === "right"
                ? "pointer-events-none fixed inset-y-0 flex max-w-full"
                : "pointer-events-none fixed left-0 right-0 flex max-w-full",
            position === "left" && "left-0",
            position === "right" && "right-0",
            position === "top" && "top-0 flex-col",
            position === "bottom" && "bottom-0 flex-col",
        )}>
                        <div
                            id=${"nix-drawer-panel-" + instanceId}
                            class=${() => {
            const openState = isOpen();
            if (openState && trapFocus && !focusTrap) {
                setTimeout(() => {
                    const el = document.getElementById("nix-drawer-panel-" + instanceId);
                    if (el && !focusTrap) {
                        focusTrap = nixFocusTrap({ container: el, initialFocus });
                        focusTrap.activate();
                    }
                }, 300); // After transition
            }
            return cx(
                "pointer-events-auto w-screen flex flex-col fixed",
                posClasses[position],
                sizeClasses[position][size],
                openState ? "translate-x-0 translate-y-0 shadow-2xl" : closedTransforms[position],
                className
            );
        }}
                        >
                            <div class="flex h-full flex-col overflow-y-auto bg-nix-bg">
                                <!-- Header -->
                                ${title || !hideCloseButton ? html`
                                    <div class="px-4 py-4 sm:px-6 flex items-start justify-between border-b border-nix-border">
                                        <div class="flex-col">
                                            ${title ? html`<h2 id=${titleId} class="text-base font-semibold leading-6 text-nix-text">${title}</h2>` : ""}
                                            ${description ? html`<p id=${descriptionId} class="mt-1 text-sm text-nix-text-muted">${description}</p>` : ""}
                                        </div>
                                        ${!hideCloseButton ? html`
                                            <div class="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    class="relative rounded-md bg-nix-bg text-nix-text-muted hover:text-nix-text focus:outline-none focus:ring-2 focus:ring-nix-primary focus:ring-offset-2 transition-colors"
                                                    @click=${handleClose}
                                                >
                                                    <span class="absolute -inset-2.5"></span>
                                                    <span class="sr-only">Close panel</span>
                                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ` : ""}
                                    </div>
                                ` : ""}

                                <!-- Content -->
                                <div class="relative flex-1 px-4 py-6 sm:px-6 text-nix-text">
                                    ${children}
                                </div>

                                <!-- Footer -->
                                ${footer ? html`
                                    <div class="px-4 py-4 sm:px-6 border-t border-nix-border bg-nix-bg/50 backdrop-blur-sm">
                                        ${footer}
                                    </div>
                                ` : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
