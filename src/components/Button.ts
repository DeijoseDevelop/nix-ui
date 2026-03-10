import { html } from "@deijose/nix-js";
import type { NixTemplate, Signal } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean | Signal<boolean>;
    loading?: boolean | Signal<boolean>;
    class?: string;
    style?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e: Event) => void;
    children: NixUIChildren;
}

// ── Variant classes ────────────────────────────────────────────────────────────

const VARIANT: Record<ButtonVariant, string> = {
    primary:
        "bg-nix-primary text-nix-text-inverse hover:bg-nix-primary-hover focus:ring-nix-primary/40 shadow-nix-sm",
    secondary:
        "bg-nix-secondary text-nix-text-inverse hover:bg-nix-secondary-hover focus:ring-nix-secondary/40",
    outline:
        "border border-nix-border text-nix-text bg-transparent hover:bg-nix-surface focus:ring-nix-primary/30",
    ghost:
        "text-nix-text bg-transparent hover:bg-nix-surface focus:ring-nix-primary/20",
    danger:
        "bg-nix-error text-nix-text-inverse hover:bg-red-600 focus:ring-nix-error/40 shadow-nix-sm",
};

const SIZE: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2.5",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Button(props: ButtonProps): NixTemplate {
    const {
        variant = "primary",
        size = "md",
        disabled = false,
        loading = false,
        type = "button",
        class: className,
        style,
        onClick,
        children,
    } = props;

    const isBtnDisabled = () => {
        const d = disabled && typeof disabled === 'object' && 'value' in disabled ? disabled.value : disabled;
        const l = loading && typeof loading === 'object' && 'value' in loading ? loading.value : loading;
        return d || l;
    };

    const isLoading = () => {
        return loading && typeof loading === 'object' && 'value' in loading ? loading.value : loading;
    }

    const base =
        "inline-flex items-center justify-center font-medium rounded-nix-md transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const classes = () => cx(base, VARIANT[variant], SIZE[size], isLoading() ? "cursor-wait opacity-80" : "", className);

    return html`
        <button
            type=${type}
            class=${classes}
            style=${style ?? ""}
            ?disabled=${isBtnDisabled}
            @click=${(e: Event) => {
                if (isBtnDisabled()) {
                    e.preventDefault();
                    return;
                }
                onClick?.(e);
            }}
        >
            ${() => isLoading()
                ? html`<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-nix-spin"></span>`
                : ""}
            ${children}
        </button>
    `;
}
