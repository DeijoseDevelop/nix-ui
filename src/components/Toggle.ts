import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

import type { FieldState } from "@deijose/nix-js";

export interface ToggleProps {
    checked?: boolean | (() => boolean);
    label?: string;
    error?: string | (() => string | null);
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    class?: string;
    style?: string;
    onChange?: (checked: boolean) => void;
    onBlur?: () => void;
    field?: FieldState<boolean>;
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const TRACK_SIZE: Record<string, string> = {
    sm: "w-8 h-4",
    md: "w-10 h-5",
    lg: "w-12 h-6",
};

const THUMB_SIZE: Record<string, string> = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
};

const THUMB_TRANSLATE: Record<string, string> = {
    sm: "translate-x-4",
    md: "translate-x-5",
    lg: "translate-x-6",
};

// ── Component ──────────────────────────────────────────────────────────────────

export function Toggle(props: ToggleProps): NixTemplate {
    const {
        checked = false,
        label,
        error,
        disabled = false,
        size = "md",
        class: className,
        style,
        onChange,
        onBlur,
        field,
    } = props;

    const localChecked = signal(typeof checked === 'function' ? checked() : checked);
    const isOn = field ? (() => field.value.value) : (typeof checked === 'function' ? checked : (() => localChecked.value));
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const toggle = () => {
        if (disabled) return;
        const newVal = !isOn();
        if (!field && typeof checked !== 'function') localChecked.value = newVal;

        if (field) {
            // Fake an event for useField coercion (it looks for e.target.checked or e.target.value)
            field.onInput({ target: { checked: newVal } } as unknown as Event);
            field.onBlur(); 
        }

        onChange?.(newVal);
        onBlur?.();
    };

    return html`
        <div class=${cx("inline-flex items-center gap-2.5", className)} style=${style ?? ""}>
            <button
                type="button"
                role="switch"
                ?disabled=${disabled}
                @click=${toggle}
                class=${() => cx(
                    "relative inline-flex shrink-0 rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-nix-primary/30 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
                    TRACK_SIZE[size],
                    isOn() ? "bg-nix-primary" : "bg-nix-border",
                    (typeof errBind === 'function' ? errBind() : errBind) ? "ring-2 ring-nix-error/50" : ""
                )}
                aria-checked=${() => String(isOn())}
            >
                <span
                    class=${() => cx(
                        "inline-block rounded-full bg-white shadow-nix-sm transform transition-transform duration-200 ease-in-out mt-0.5 ml-0.5",
                        THUMB_SIZE[size],
                        isOn() ? THUMB_TRANSLATE[size] : "translate-x-0",
                    )}
                ></span>
            </button>
            ${label
                ? html`<span
                    class=${cx("text-sm select-none", disabled ? "text-nix-text-muted" : "text-nix-text")}
                    @click=${toggle}
                    style="cursor: pointer;"
                >${label}</span>`
                : ""}
        </div>
        ${() => {
            const currentError = typeof errBind === 'function' ? errBind() : errBind;
            return currentError 
                ? html`<span class="text-xs text-nix-error mt-1">${currentError}</span>`
                : "";
        }}
    `;
}
