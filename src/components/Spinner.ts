import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "border" | "dots" | "pulse";

export interface SpinnerProps {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    color?: string;
    label?: string;
    class?: string;
    style?: string;
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const BORDER_SIZE: Record<SpinnerSize, string> = {
    xs: "w-3 h-3 border",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-[3px]",
    xl: "w-12 h-12 border-4",
};

const DOT_SIZE: Record<SpinnerSize, string> = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
    xl: "w-3 h-3",
};

const DOT_GAP: Record<SpinnerSize, string> = {
    xs: "gap-0.5",
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
    xl: "gap-2.5",
};

const PULSE_SIZE: Record<SpinnerSize, string> = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Spinner(props: SpinnerProps = {}): NixTemplate {
    const {
        size = "md",
        variant = "border",
        color,
        label,
        class: className,
        style,
    } = props;

    const colorClass = color ?? "text-nix-primary";

    if (variant === "dots") {
        return html`
            <div class=${cx("inline-flex items-center", DOT_GAP[size], className)} style=${style ?? ""} role="status" aria-label=${label ?? "Loading"}>
                <span class=${cx("rounded-full animate-nix-pulse", DOT_SIZE[size], colorClass, "bg-current")} style="animation-delay: 0ms;"></span>
                <span class=${cx("rounded-full animate-nix-pulse", DOT_SIZE[size], colorClass, "bg-current")} style="animation-delay: 150ms;"></span>
                <span class=${cx("rounded-full animate-nix-pulse", DOT_SIZE[size], colorClass, "bg-current")} style="animation-delay: 300ms;"></span>
                ${label ? html`<span class="sr-only">${label}</span>` : ""}
            </div>
        `;
    }

    if (variant === "pulse") {
        return html`
            <div class=${cx("inline-block", className)} style=${style ?? ""} role="status" aria-label=${label ?? "Loading"}>
                <span class=${cx("block rounded-full animate-nix-pulse", PULSE_SIZE[size], colorClass, "bg-current opacity-75")}></span>
                ${label ? html`<span class="sr-only">${label}</span>` : ""}
            </div>
        `;
    }

    // Default: border spinner
    return html`
        <div class=${cx("inline-flex items-center gap-2", className)} style=${style ?? ""} role="status" aria-label=${label ?? "Loading"}>
            <span class=${cx(
                "inline-block rounded-full border-current border-t-transparent animate-nix-spin",
                BORDER_SIZE[size],
                colorClass,
            )}></span>
            ${label ? html`<span class="text-sm text-nix-text-muted">${label}</span>` : ""}
        </div>
    `;
}
