import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    pill?: boolean;
    dot?: boolean;
    class?: string;
    style?: string;
    children: NixUIChildren;
}

// ── Variant classes ────────────────────────────────────────────────────────────

const VARIANT: Record<BadgeVariant, string> = {
    default: "bg-nix-surface text-nix-text border border-nix-border",
    success: "bg-nix-success-light text-green-800",
    warning: "bg-nix-warning-light text-amber-800",
    error:   "bg-nix-error-light text-red-800",
    info:    "bg-nix-info-light text-blue-800",
};

const DOT_COLOR: Record<BadgeVariant, string> = {
    default: "bg-nix-text-muted",
    success: "bg-nix-success",
    warning: "bg-nix-warning",
    error:   "bg-nix-error",
    info:    "bg-nix-info",
};

const SIZE: Record<BadgeSize, string> = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-sm",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Badge(props: BadgeProps): NixTemplate {
    const {
        variant = "default",
        size = "md",
        pill = false,
        dot = false,
        class: className,
        style,
        children,
    } = props;

    const base = "inline-flex items-center gap-1 font-medium leading-none";
    const radius = pill ? "rounded-full" : "rounded-nix-sm";

    const classes = cx(base, VARIANT[variant], SIZE[size], radius, className);

    return html`
        <span class=${classes} style=${style ?? ""}>
            ${dot
                ? html`<span class=${cx("w-1.5 h-1.5 rounded-full", DOT_COLOR[variant])}></span>`
                : ""}
            ${children}
        </span>
    `;
}
