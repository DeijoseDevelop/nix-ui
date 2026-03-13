import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

import type { FieldState } from "@deijose/nix-js";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string | (() => string);
    placeholder?: string;
    label?: string;
    error?: string | (() => string | null);
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    class?: string;
    style?: string;
    onChange?: (value: string, e: Event) => void;
    onBlur?: (e: Event) => void;
    field?: FieldState<string>;
}

// ── Size maps ──────────────────────────────────────────────────────────────────

const SIZE: Record<string, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
};

// ── Component ──────────────────────────────────────────────────────────────────

let _selectId = 0;

export function Select(props: SelectProps): NixTemplate {
    const {
        options,
        value = "",
        placeholder,
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

    const id = `nix-select-${_selectId++}`;

    const valBind = field ? (() => String(field.value.value ?? "")) : (typeof value === 'function' ? value : value);
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const base =
        "w-full rounded-nix-md border bg-nix-bg text-nix-text transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed pr-10 shadow-nix-sm";

    const classes = () => {
        const currentError = typeof errBind === 'function' ? errBind() : errBind;
        const stateClass = currentError
            ? "border-nix-error focus:ring-nix-error/10 focus:border-nix-error"
            : "border-nix-border hover:border-nix-primary/50 focus:ring-nix-primary/10 focus:border-nix-primary";
        return cx(base, SIZE[size], stateClass, className);
    };

    return html`
        <div class="flex flex-col gap-1.5 w-full">
            ${label
                ? html`<label for=${id} class="text-sm font-semibold text-nix-text/90">${label}</label>`
                : ""}
            <div class="relative group">
                <select
                    id=${id}
                    class=${classes}
                    style=${style ?? ""}
                    ?disabled=${disabled}
                    @change=${(e: Event) => {
                        const val = (e.target as HTMLSelectElement).value;
                        field?.onInput(e);
                        onChange?.(val, e);
                    }}
                    @blur=${(e: Event) => {
                        field?.onBlur();
                        onBlur?.(e);
                    }}
                >
                    ${placeholder
                        ? html`<option value="" disabled selected>${placeholder}</option>`
                        : ""}
                    ${() => {
                        const currentVal = typeof valBind === 'function' ? valBind() : valBind;
                        return options.map(
                            (opt) => html`
                                <option
                                    value=${opt.value}
                                    ?selected=${opt.value === currentVal}
                                    ?disabled=${opt.disabled ?? false}
                                    class="bg-nix-bg text-nix-text"
                                >${opt.label}</option>
                            `,
                        );
                    }}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-nix-text-muted transition-colors group-focus-within:text-nix-primary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4 4 4-4"/>
                    </svg>
                </div>
            </div>
            ${() => {
                const currentError = typeof errBind === 'function' ? errBind() : errBind;
                return currentError 
                    ? html`<span class="text-xs text-nix-error ml-1 font-medium animate-nix-slide-up">${currentError}</span>`
                    : "";
            }}
        </div>
    `;
}
