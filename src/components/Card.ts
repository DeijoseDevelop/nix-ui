import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CardProps {
    class?: string;
    style?: string;
    children: NixUIChildren;
    /** Accessible label when Card is used as a landmark */
    ariaLabel?: string;
}

export interface CardHeaderProps {
    class?: string;
    children: NixUIChildren;
}

export interface CardBodyProps {
    class?: string;
    children: NixUIChildren;
}

export interface CardFooterProps {
    class?: string;
    children: NixUIChildren;
}

// ── Components ─────────────────────────────────────────────────────────────────

export function Card(props: CardProps): NixTemplate {
    const { class: className, style, children, ariaLabel } = props;

    const classes = cx(
        "rounded-nix-lg border border-nix-border bg-nix-bg shadow-nix-sm overflow-hidden",
        className,
    );

    return html`
        <div class=${classes} style=${style ?? ""} aria-label=${ariaLabel || undefined}>
            ${children}
        </div>
    `;
}

export function CardHeader(props: CardHeaderProps): NixTemplate {
    const { class: className, children } = props;

    return html`
        <div class=${cx("px-5 py-4 border-b border-nix-border", className)}>
            ${children}
        </div>
    `;
}

export function CardBody(props: CardBodyProps): NixTemplate {
    const { class: className, children } = props;

    return html`
        <div class=${cx("px-5 py-4", className)}>
            ${children}
        </div>
    `;
}

export function CardFooter(props: CardFooterProps): NixTemplate {
    const { class: className, children } = props;

    return html`
        <div class=${cx("px-5 py-3 border-t border-nix-border bg-nix-surface", className)}>
            ${children}
        </div>
    `;
}
