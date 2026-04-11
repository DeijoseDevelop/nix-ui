import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

import type { FieldState } from "@deijose/nix-js";

export interface TextareaProps {
    placeholder?: string;
    value?: string | (() => string);
    label?: string;
    error?: string | (() => string | null);
    rows?: number;
    disabled?: boolean;
    class?: string;
    style?: string;
    onInput?: (value: string, e: Event) => void;
    onBlur?: (e: Event) => void;
    field?: FieldState<string>;
    description?: string;
    required?: boolean;
}

let _textareaId = 0;

export function Textarea(props: TextareaProps): NixTemplate {
    const {
        placeholder = "",
        value = "",
        label,
        error,
        rows = 4,
        disabled = false,
        class: className,
        style,
        onInput,
        onBlur,
        field,
        description,
        required = false,
    } = props;

    const instanceId = _textareaId++;
    const id = `nix-textarea-${instanceId}`;
    const labelId = `nix-textarea-label-${instanceId}`;
    const errorId = `nix-textarea-error-${instanceId}`;
    const descriptionId = `nix-textarea-description-${instanceId}`;

    const valBind = field ? (() => String(field.value.value ?? "")) : (typeof value === 'function' ? value : value);
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const base =
        "w-full rounded-nix-md border bg-nix-bg text-nix-text placeholder:text-nix-text-muted transition-all duration-150 px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const classes = () => {
        const currentError = typeof errBind === 'function' ? errBind() : errBind;
        const borderClass = currentError
            ? "border-nix-error focus:ring-nix-error/30"
            : "border-nix-border focus:ring-nix-primary/30 focus:border-nix-primary";
        return cx(base, borderClass, className);
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
            <textarea
                id=${id}
                class=${classes}
                style=${style ?? ""}
                rows=${rows}
                value=${valBind}
                placeholder=${placeholder}
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
            const val = (e.target as HTMLTextAreaElement).value;
            field?.onInput(e);
            onInput?.(val, e);
        }}
                @blur=${(e: Event) => {
            field?.onBlur();
            onBlur?.(e);
        }}
            ></textarea>
            ${() => {
            const currentError = typeof errBind === 'function' ? errBind() : errBind;
            return currentError
                ? html`<span id=${errorId} class="text-xs text-nix-error" role="alert">${currentError}</span>`
                : "";
        }}
        </div>
    `;
}
