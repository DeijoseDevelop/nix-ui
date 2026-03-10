import { html } from "@deijose/nix-js";
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
}

// ── Position classes ───────────────────────────────────────────────────────────

const POSITION: Record<TooltipPosition, string> = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2",
    right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Tooltip(props: TooltipProps): NixTemplate {
    const {
        text,
        position = "top",
        class: className,
        style,
        children,
    } = props;

    return html`
        <div class=${cx("relative inline-flex group", className)} style=${style ?? ""}>
            ${children}
            <div
                class=${cx(
                    "absolute z-40 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-nix-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-nix-lg",
                    POSITION[position],
                )}
                role="tooltip"
            >
                ${text}
            </div>
        </div>
    `;
}
