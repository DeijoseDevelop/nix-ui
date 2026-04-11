import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export type ProgressVariant = "primary" | "success" | "warning" | "error";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
    value?: number | (() => number);
    variant?: ProgressVariant;
    size?: ProgressSize;
    showLabel?: boolean;
    striped?: boolean;
    animated?: boolean;
    class?: string;
    style?: string;
    label?: string | ((value: number) => string);
    /** Accessible label describing what the progress represents */
    ariaLabel?: string;
    /** Whether the progress is indeterminate (unknown completion) */
    indeterminate?: boolean;
}

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
        ariaLabel,
        indeterminate = false,
    } = props;

    const getVal = typeof value === "function" ? value : () => value ?? 0;
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
            ${showLabel || ariaLabel ? html`
                <div class="flex justify-between items-center mb-1.5">
                    ${ariaLabel ? html`<span class="sr-only">${ariaLabel}</span>` : ""}
                    ${showLabel ? html`<span class="text-xs font-medium text-nix-text">${() => resolveLabel()}</span>` : ""}
                </div>
            ` : ""}
            <div
                class=${cx("w-full rounded-full overflow-hidden", VARIANT_TRACK[variant], HEIGHT[size])}
                role="progressbar"
                aria-valuenow=${indeterminate ? undefined : () => String(clamp())}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label=${ariaLabel || undefined}
                aria-busy=${indeterminate ? "true" : undefined}
            >
                <div
                    class=${cx("h-full rounded-full transition-all duration-500 ease-out", VARIANT_BG[variant], animatedClass, indeterminate ? "animate-pulse" : "")}
                    style=${() => indeterminate ? "width: 100%; animation: nix-progress-indeterminate 1.5s ease-in-out infinite;" : `width: ${clamp()}%; ${stripedCss}`}
                ></div>
            </div>
        </div>
    `;
}
