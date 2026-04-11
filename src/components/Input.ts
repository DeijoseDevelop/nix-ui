import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

import type { FieldState } from "@deijose/nix-js";

export type InputType = "text" | "password" | "email" | "number" | "search" | "tel" | "url";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps {
    type?: InputType;
    size?: InputSize;
    placeholder?: string;
    value?: string | (() => string);
    label?: string;
    error?: string | (() => string | null);
    disabled?: boolean;
    class?: string;
    style?: string;
    onInput?: (value: string, e: Event) => void;
    onChange?: (value: string, e: Event) => void;
    onBlur?: (e: Event) => void;
    field?: FieldState<string | number>;
    /** Additional description or hint text */
    description?: string;
    /** Whether the field is required */
    required?: boolean;
}

const SIZE: Record<InputSize, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
};

let _inputId = 0;

export function Input(props: InputProps): NixTemplate {
    const {
        type = "text",
        size = "md",
        placeholder = "",
        value = "",
        label,
        error,
        disabled = false,
        class: className,
        style,
        onInput,
        onChange,
        onBlur,
        field,
        description,
        required = false,
    } = props;

    const instanceId = _inputId++;
    const id = `nix-input-${instanceId}`;
    const labelId = `nix-input-label-${instanceId}`;
    const errorId = `nix-input-error-${instanceId}`;
    const descriptionId = `nix-input-description-${instanceId}`;

    const focused = signal(false);

    const valBind = field ? (() => String(field.value.value ?? "")) : (typeof value === 'function' ? value : value);
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const base =
        "w-full rounded-nix-md border bg-nix-bg text-nix-text placeholder:text-nix-text-muted transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const classes = () => {
        const currentError = typeof errBind === 'function' ? errBind() : errBind;
        const borderClass = currentError
            ? "border-nix-error focus:ring-nix-error/30"
            : "border-nix-border focus:ring-nix-primary/30 focus:border-nix-primary";
        return cx(base, SIZE[size], borderClass, className);
    };

    return html`
        <div class="flex flex-col gap-1.5">
            ${label
            ? html`<label id=${labelId} for=${id} class="text-sm font-medium text-nix-text">
                      ${label}
                      ${required ? html`<span class="text-nix-error" aria-hidden="true">*</span>` : ""}
                  </label>`
            : ""}
            ${description
            ? html`<span id=${descriptionId} class="text-xs text-nix-text-muted">${description}</span>`
            : ""}
            <input
                id=${id}
                type=${type}
                class=${classes}
                style=${style ?? ""}
                placeholder=${placeholder}
                value=${valBind}
                disabled=${disabled}
                required=${required}
                aria-labelledby=${label ? labelId : undefined}
                aria-invalid=${() => {
            const currentError = typeof errBind === 'function' ? errBind() : errBind;
            return currentError ? "true" : undefined;
        }}
                aria-describedby=${() => {
            const currentError = typeof errBind === 'function' ? errBind() : errBind;
            const ids = [];
            if (description) ids.push(descriptionId);
            if (currentError) ids.push(errorId);
            return ids.length > 0 ? ids.join(" ") : undefined;
        }}
                @input=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            field?.onInput(e);
            onInput?.(val, e);
        }}
                @change=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            onChange?.(val, e);
        }}
                @focus=${() => focused.value = true}
                @blur=${(e: Event) => {
            focused.value = false;
            field?.onBlur();
            onBlur?.(e);
        }}
            />
            ${() => {
            const currentError = typeof errBind === 'function' ? errBind() : errBind;
            return currentError
                ? html`<span id=${errorId} class="text-xs text-nix-error" role="alert">${currentError}</span>`
                : "";
        }}
        </div>
    `;
}
