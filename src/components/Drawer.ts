import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export interface DrawerProps {
    open: boolean | (() => boolean);
    title?: string;
    description?: string;
    position?: "left" | "right" | "top" | "bottom";
    size?: "sm" | "md" | "lg" | "xl" | "full";
    onClose: () => void;
    children: NixTemplate | string | Array<NixTemplate | string>;
    footer?: NixTemplate | string | Array<NixTemplate | string>;
    class?: string;
    hideCloseButton?: boolean;
}

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
    } = props;

    // Dimensions based on position and size
    const sizeClasses = {
        left: { sm: "w-64", md: "w-80", lg: "w-96", xl: "w-[32rem]", full: "w-screen" },
        right: { sm: "w-64", md: "w-80", lg: "w-96", xl: "w-[32rem]", full: "w-screen" },
        top: { sm: "h-32", md: "h-64", lg: "h-96", xl: "h-[32rem]", full: "h-screen" },
        bottom: { sm: "h-32", md: "h-64", lg: "h-96", xl: "h-[32rem]", full: "h-screen" }
    };
    
    // Position classes
    const posClasses = {
        left: "top-0 left-0 bottom-0 bg-nix-bg shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out border-r border-nix-border",
        right: "top-0 right-0 bottom-0 bg-nix-bg shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-nix-border",
        top: "top-0 left-0 right-0 bg-nix-bg shadow-2xl overflow-auto transform transition-transform duration-300 ease-in-out border-b border-nix-border",
        bottom: "bottom-0 left-0 right-0 bg-nix-bg shadow-2xl overflow-auto transform transition-transform duration-300 ease-in-out border-t border-nix-border"
    };

    // Animation states
    const closedTransforms = {
        left: "-translate-x-full",
        right: "translate-x-full",
        top: "-translate-y-full",
        bottom: "translate-y-full"
    };

    const isOpen = () => (typeof open === "function" ? open() : open);

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen()) {
            onClose();
        }
    };

    return html`
        <div 
            class="relative z-50" 
            aria-labelledby=${title ? "drawer-title" : undefined} 
            role="dialog" 
            aria-modal="true"
            @keydown=${handleKeydown}
            tabindex="-1"
            show=${isOpen}
        >
            <!-- Backdrop -->
            <div 
                class=${() => cx(
                    "fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
                    isOpen() ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                @click=${onClose}
                aria-hidden="true"
            ></div>

            <!-- Drawer Panel -->
            <div class="fixed inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                        <div 
                            class=${() => cx(
                                "pointer-events-auto w-screen flex flex-col fixed",
                                posClasses[position],
                                sizeClasses[position][size],
                                isOpen() ? "translate-x-0 translate-y-0" : closedTransforms[position],
                                className
                            )}
                        >
                            <div class="flex h-full flex-col overflow-y-auto bg-nix-bg">
                                <!-- Header -->
                                ${title || !hideCloseButton ? html`
                                    <div class="px-4 py-4 sm:px-6 flex items-start justify-between border-b border-nix-border">
                                        <div class="flex-col">
                                            ${title ? html`<h2 class="text-base font-semibold leading-6 text-nix-text" id="drawer-title">${title}</h2>` : ""}
                                            ${description ? html`<p class="mt-1 text-sm text-nix-text-muted">${description}</p>` : ""}
                                        </div>
                                        ${!hideCloseButton ? html`
                                            <div class="ml-3 flex h-7 items-center">
                                                <button 
                                                    type="button" 
                                                    class="relative rounded-md bg-nix-bg text-nix-text-muted hover:text-nix-text focus:outline-none focus:ring-2 focus:ring-nix-primary focus:ring-offset-2 transition-colors"
                                                    @click=${onClose}
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
