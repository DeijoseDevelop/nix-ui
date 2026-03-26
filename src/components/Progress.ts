import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ProgressVariant = "primary" | "success" | "warning" | "error";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
    value: number | (() => number);
    variant?: ProgressVariant;
    size?: ProgressSize;
    showLabel?: boolean;
    striped?: boolean;
    animated?: boolean;
    class?: string;
    style?: string;
    label?: string | ((value: number) => string);
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const HEIGHT: Record<ProgressSize, string> = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
};

const VARIANT_BG: Record<ProgressVariant, string> = {
    primary: "bg-nix-primary",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
};

const VARIANT_TRACK: Record<ProgressVariant, string> = {
    primary: "bg-nix-primary/15",
    success: "bg-green-500/15",
    warning: "bg-amber-500/15",
    error: "bg-red-500/15",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Progress(props: ProgressProps): NixTemplate {
    const {
        value,
        variant = "primary",
        size = "md",
        showLabel = false,
        striped = false,
        animated = false,
        class: className,
        style,
        label,
    } = props;

    const getVal = typeof value === "function" ? value : () => value;
    const clamp = () => Math.max(0, Math.min(100, getVal()));

    const resolveLabel = () => {
        const v = clamp();
        if (typeof label === "function") return label(v);
        if (typeof label === "string") return label;
        return `${Math.round(v)}%`;
    };

    const stripedCss = striped || animated
        ? "background-image: linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent); background-size: 1rem 1rem;"
        : "";

    const animatedClass = animated ? "nix-progress-animated" : "";

    return html`
        ${animated ? html`
            <style>
                @keyframes nix-progress-stripe { from { background-position: 1rem 0; } to { background-position: 0 0; } }
                .nix-progress-animated { animation: nix-progress-stripe 1s linear infinite; }
            </style>
        ` : ""}
        <div class=${cx("w-full", className)} style=${style ?? ""}>
            ${showLabel ? html`
                <div class="flex justify-between items-center mb-1.5">
                    <span class="text-xs font-medium text-nix-text">${() => resolveLabel()}</span>
                </div>
            ` : ""}
            <div class=${cx("w-full rounded-full overflow-hidden", VARIANT_TRACK[variant], HEIGHT[size])} role="progressbar" aria-valuenow=${() => String(clamp())} aria-valuemin="0" aria-valuemax="100">
                <div
                    class=${cx("h-full rounded-full transition-all duration-500 ease-out", VARIANT_BG[variant], animatedClass)}
                    style=${() => `width: ${clamp()}%; ${stripedCss}`}
                ></div>
            </div>
        </div>
    `;
}
