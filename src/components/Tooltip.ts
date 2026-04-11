import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
    text: string;
    position?: TooltipPosition;
    class?: string;
    style?: string;
    children: NixUIChildren;
    /** Delay before showing tooltip (ms) */
    delay?: number;
    /** Whether tooltip can be dismissed via keyboard */
    dismissable?: boolean;
}

// ── Position classes ───────────────────────────────────────────────────────────

const POSITION: Record<TooltipPosition, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

// ── Component ──────────────────────────────────────────────────────────────────

let _tooltipId = 0;

export function Tooltip(props: TooltipProps): NixTemplate {
    const {
        text,
        position = "top",
        class: className,
        style,
        children,
        delay = 0,
        dismissable = false,
    } = props;

    const instanceId = _tooltipId++;
    const tooltipId = `nix-tooltip-${instanceId}`;
    const triggerId = `nix-tooltip-trigger-${instanceId}`;

    const isVisible = signal(false);
    let showTimeout: number | null = null;

    const show = () => {
        if (delay > 0) {
            showTimeout = window.setTimeout(() => {
                isVisible.value = true;
            }, delay);
        } else {
            isVisible.value = true;
        }
    };

    const hide = () => {
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }
        isVisible.value = false;
    };

    const toggle = () => {
        if (isVisible.value) {
            hide();
        } else {
            show();
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && dismissable) {
            hide();
        }
    };

    return html`
        <div class=${cx("relative inline-flex group", className)} style=${style ?? ""}>
            <div
                id=${triggerId}
                class="inline-flex"
                @mouseenter=${show}
                @mouseleave=${hide}
                @focus=${show}
                @blur=${hide}
                @click=${dismissable ? toggle : undefined}
                @keydown=${handleKeydown}
                aria-describedby=${isVisible.value ? tooltipId : undefined}
            >
                ${children}
            </div>
            <div
                id=${tooltipId}
                class=${cx(
        "absolute z-40 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-nix-md whitespace-nowrap pointer-events-none shadow-nix-lg",
        "transition-opacity duration-150",
        isVisible.value ? "opacity-100" : "opacity-0",
        POSITION[position],
    )}
                role="tooltip"
                show=${() => isVisible.value}
            >
                ${text}
            </div>
        </div>
    `;
}
