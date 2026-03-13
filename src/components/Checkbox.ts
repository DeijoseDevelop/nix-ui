import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

import type { FieldState } from "@deijose/nix-js";

export interface CheckboxProps {
    checked?: boolean | (() => boolean);
    label?: string;
    error?: string | (() => string | null);
    disabled?: boolean;
    indeterminate?: boolean;
    class?: string;
    style?: string;
    onChange?: (checked: boolean, e: Event) => void;
    onBlur?: (e: Event) => void;
    field?: FieldState<boolean>;
}

// ── Component ──────────────────────────────────────────────────────────────────

let _checkboxId = 0;

export function Checkbox(props: CheckboxProps): NixTemplate {
    const {
        checked = false,
        label,
        error,
        disabled = false,
        indeterminate: _indeterminate = false,
        class: className,
        style,
        onChange,
        onBlur,
        field,
    } = props;

    const id = `nix-checkbox-${_checkboxId++}`;
    const localChecked = signal(typeof checked === 'function' ? checked() : checked);

    // Derived states 
    const isChecked = field ? (() => !!field.value.value) : (typeof checked === 'function' ? checked : (() => localChecked.value));
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const checkmark = html`
        <svg class="w-3 h-3 text-white transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    `;

    return html`
        <div class=${cx("flex flex-col gap-1.5", className)} style=${style ?? ""}>
            <div class="inline-flex items-center gap-2.5 group">
                <div class="relative flex items-center shrink-0">
                    <input
                        id=${id}
                        type="checkbox"
                        class="peer absolute opacity-0 w-0 h-0"
                        ?checked=${isChecked}
                        ?disabled=${disabled}
                        @change=${(e: Event) => {
                            const el = e.target as HTMLInputElement;
                            if (!field && typeof checked !== 'function') localChecked.value = el.checked;
                            field?.onInput(e);
                            onChange?.(el.checked, e);
                        }}
                        @blur=${(e: Event) => {
                            field?.onBlur();
                            onBlur?.(e);
                        }}
                    />
                    <div
                        @click=${() => !disabled && (document.getElementById(id) as HTMLInputElement)?.click()}
                        class=${() => cx(
                            "w-5 h-5 rounded-nix-sm border-2 flex items-center justify-center transition-all duration-200 cursor-pointer overflow-hidden",
                            isChecked() 
                                ? "bg-nix-primary border-nix-primary shadow-nix-sm" 
                                : "bg-nix-bg border-nix-border group-hover:border-nix-primary/50",
                            (typeof errBind === 'function' ? errBind() : errBind) ? "border-nix-error bg-nix-error/5" : "",
                            disabled && "opacity-50 cursor-not-allowed bg-nix-surface"
                        )}
                    >
                        ${() => isChecked() ? checkmark : ""}
                    </div>
                </div>
                ${label
                    ? html`<label
                        for=${id}
                        class=${cx(
                            "text-sm font-medium select-none cursor-pointer transition-colors duration-200",
                            disabled ? "text-nix-text-muted cursor-not-allowed" : "text-nix-text group-hover:text-nix-primary",
                        )}
                    >${label}</label>`
                    : ""}
            </div>
            ${() => {
                const currentError = typeof errBind === 'function' ? errBind() : errBind;
                return currentError 
                    ? html`<span class="text-xs text-nix-error mt-0.5 ml-7 animate-nix-slide-up">${currentError}</span>`
                    : "";
            }}
        </div>
    `;
}
