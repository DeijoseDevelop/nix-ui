import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps {
    variant?: SkeletonVariant;
    width?: string;
    height?: string;
    count?: number;
    class?: string;
    style?: string;
    /** Accessible label announced to screen readers while loading */
    label?: string;
}

export function Skeleton(props: SkeletonProps): NixTemplate {
    const {
        variant = "text",
        width,
        height,
        count = 1,
        class: className,
        style,
        label = "Loading content...",
    } = props;

    const shimmerStyle = `
        background: linear-gradient(90deg, var(--nix-surface, #e5e7eb) 25%, var(--nix-border, #f3f4f6) 50%, var(--nix-surface, #e5e7eb) 75%);
        background-size: 200% 100%;
        animation: nix-skeleton-shimmer 1.5s ease-in-out infinite;
    `;

    const baseClass = cx(
        "block",
        variant === "text" && "rounded-nix-sm",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-nix-md",
        className,
    );

    const resolveSize = () => {
        const w = width ?? (variant === "circular" ? "3rem" : "100%");
        const h = height ?? (variant === "text" ? "1rem" : variant === "circular" ? "3rem" : "8rem");
        return { w, h };
    };

    const items = [];
    for (let i = 0; i < count; i++) {
        const { w, h } = resolveSize();
        items.push(html`
            <div
                class=${baseClass}
                style=${`width: ${w}; height: ${h}; ${shimmerStyle} ${style ?? ""}`}
                aria-hidden="true"
            ></div>
        `);
    }

    return html`
        <style>
            @keyframes nix-skeleton-shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        </style>
        <div class=${cx("flex flex-col", variant === "text" && "gap-2")} role="status" aria-label=${label}>
            ${items}
            <span class="sr-only">${label}</span>
        </div>
    `;
}
