import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    status?: "online" | "offline" | "busy" | "away";
    class?: string;
    style?: string;
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const SIZE: Record<AvatarSize, string> = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
};

const STATUS_SIZE: Record<AvatarSize, string> = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-3.5 h-3.5",
};

const STATUS_COLOR: Record<string, string> = {
    online:  "bg-nix-success",
    offline: "bg-gray-400",
    busy:    "bg-nix-error",
    away:    "bg-nix-warning",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

const FALLBACK_COLORS = [
    "bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500",
    "bg-cyan-500", "bg-violet-500", "bg-teal-500", "bg-pink-500",
];

function hashColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Avatar(props: AvatarProps): NixTemplate {
    const {
        src,
        alt = "",
        name,
        size = "md",
        status,
        class: className,
        style,
    } = props;

    const base = "relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0";

    return html`
        <div class=${cx(base, SIZE[size], className)} style=${style ?? ""}>
            ${src
                ? html`<img src=${src} alt=${alt || name || ""} class="w-full h-full object-cover" />`
                : html`
                    <div class=${cx("w-full h-full flex items-center justify-center font-semibold text-white", name ? hashColor(name) : "bg-nix-secondary")}>
                        ${name ? getInitials(name) : html`
                            <svg class="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        `}
                    </div>
                `}
            ${status
                ? html`<span class=${cx(
                    "absolute bottom-0 right-0 rounded-full ring-2 ring-nix-bg",
                    STATUS_SIZE[size],
                    STATUS_COLOR[status],
                )}></span>`
                : ""}
        </div>
    `;
}
