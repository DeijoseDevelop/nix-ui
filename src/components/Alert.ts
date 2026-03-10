import { html, signal, transition } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    dismissible?: boolean;
    icon?: boolean;
    class?: string;
    style?: string;
    onDismiss?: () => void;
    children: NixUIChildren;
}

// ── Variant classes ────────────────────────────────────────────────────────────

const VARIANT: Record<AlertVariant, string> = {
    info:    "bg-nix-info-light border-nix-info/30 text-blue-800",
    success: "bg-nix-success-light border-nix-success/30 text-green-800",
    warning: "bg-nix-warning-light border-nix-warning/30 text-amber-800",
    error:   "bg-nix-error-light border-nix-error/30 text-red-800",
};

const ICON_SVG: Record<AlertVariant, string> = {
    info:    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    error:   '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Alert(props: AlertProps): NixTemplate {
    const {
        variant = "info",
        title,
        dismissible = false,
        icon = true,
        class: className,
        style,
        onDismiss,
        children,
    } = props;

    const visible = signal(true);

    const dismiss = () => {
        visible.value = false;
        onDismiss?.();
    };

    const classes = cx(
        "flex gap-3 rounded-nix-lg border p-4",
        VARIANT[variant],
        className,
    );

    return transition(
        () =>
            visible.value
                ? html`
                    <div class=${classes} role="alert">
                        ${icon
                            ? html`
                                <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    ${html`<g>${ICON_SVG[variant]}</g>`}
                                </svg>
                            `
                            : ""}
                        <div class="flex-1 min-w-0">
                            ${title
                                ? html`<h4 class="text-sm font-semibold mb-1">${title}</h4>`
                                : ""}
                            <div class="text-sm opacity-90">${children}</div>
                        </div>
                        ${dismissible
                            ? html`
                                <button
                                    @click=${dismiss}
                                    class="shrink-0 p-0.5 rounded-nix-sm hover:bg-black/10 transition-colors cursor-pointer"
                                    aria-label="Dismiss"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            `
                            : ""}
                    </div>
                `
                : null,
        {
            name: "fade",
            appear: true,
            duration: 200,
            onBeforeEnter: (el) => {
                if (style) el.setAttribute("style", style);
            },
        },
    );
}
