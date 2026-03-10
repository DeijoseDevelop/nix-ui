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
    const isChecked = field ? (() => field.value.value) : (typeof checked === 'function' ? checked : (() => localChecked.value));
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const baseClass = "w-4 h-4 rounded-sm border transition-all duration-150 cursor-pointer accent-nix-primary focus:ring-2 focus:ring-nix-primary/30 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const boxClass = () => {
        const currentError = typeof errBind === 'function' ? errBind() : errBind;
        return cx(
            baseClass,
            currentError ? "border-nix-error" : "border-nix-border",
            className,
        );
    };

    return html`
        <div class="flex flex-col gap-1.5" style=${style ?? ""}>
            <div class="inline-flex items-center gap-2">
                <input
                    id=${id}
                    type="checkbox"
                    class=${boxClass}
                    ?checked=${isChecked}
                    ?disabled=${disabled}
                    @change=${(e: Event) => {
                        const el = e.target as HTMLInputElement;
                        if (!field && typeof checked !== 'function') localChecked.value = el.checked;
                        field?.onInput(e); // Trigger validation & bind true/false automatically as it parses coerce in form.ts
                        onChange?.(el.checked, e);
                    }}
                    @blur=${(e: Event) => {
                        field?.onBlur();
                        onBlur?.(e);
                    }}
                />
                ${label
                    ? html`<label
                        for=${id}
                        class=${cx(
                            "text-sm select-none cursor-pointer",
                            disabled ? "text-nix-text-muted" : "text-nix-text",
                        )}
                    >${label}</label>`
                    : ""}
            </div>
            ${() => {
                const currentError = typeof errBind === 'function' ? errBind() : errBind;
                return currentError 
                    ? html`<span class="text-xs text-nix-error">${currentError}</span>`
                    : "";
            }}
        </div>
    `;
}
