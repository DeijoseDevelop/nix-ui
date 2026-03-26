import { html } from "@deijose/nix-js";
import type { NixTemplate, FieldState } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number | (() => number);
    label?: string;
    error?: string | (() => string | null);
    disabled?: boolean;
    showValue?: boolean;
    class?: string;
    field?: FieldState<number>;
    onChange?: (value: number, e: Event) => void;
}

let _sliderId = 0;

export function Slider(props: SliderProps): NixTemplate {
    const {
        min = 0,
        max = 100,
        step = 1,
        value = 0,
        label,
        error,
        disabled = false,
        showValue = false,
        class: className,
        field,
        onChange,
    } = props;

    const id = `nix-slider-${_sliderId++}`;

    const valBind = field ? (() => field.value.value ?? min) : (typeof value === 'function' ? value : value);
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const baseClass = "w-full focus:outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-nix-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nix-primary [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:focus:ring-4 [&::-webkit-slider-thumb]:focus:ring-nix-primary/20 hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95";

    // Progress bar calculation
    const progressStyle = () => {
        const currentVal = typeof valBind === 'function' ? valBind() : valBind;
        const percentage = Math.max(0, Math.min(100, ((currentVal - min) / (max - min)) * 100));
        const color = typeof errBind === 'function' && errBind() ? 'var(--nix-error, #ef4444)' : 'var(--nix-primary, #10b981)';
        return `background: linear-gradient(to right, ${color} ${percentage}%, var(--nix-border, #e5e7eb) ${percentage}%)`;
    };

    return html`
        <div class="flex flex-col gap-1.5 w-full ${className ?? ""}">
            ${label || showValue ? html`
                <div class="flex justify-between items-center">
                    ${label ? html`<label for=${id} class="text-sm font-medium text-nix-text">${label}</label>` : html`<span></span>`}
                    ${showValue ? html`<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-nix-bg text-nix-text border border-nix-border shadow-sm">${valBind}</span>` : ""}
                </div>
            ` : ""}
            
            <div class="relative flex items-center h-8">
                <input
                    id=${id}
                    type="range"
                    min=${min}
                    max=${max}
                    step=${step}
                    value=${valBind}
                    disabled=${disabled}
                    style=${progressStyle}
                    class=${cx(baseClass, "rounded-full relative z-10", typeof errBind === 'function' && errBind() ? "[&::-webkit-slider-thumb]:bg-nix-error hover:[&::-webkit-slider-thumb]:bg-nix-error/90" : "")}
                    @input=${(e: Event) => {
                        const target = e.target as HTMLInputElement;
                        const numVal = parseFloat(target.value);
                        if (field) field.value.value = numVal;
                        field?.onInput(e);
                        // Trigger style update immediately for fluid movement
                        target.style.background = `linear-gradient(to right, var(--nix-primary, #10b981) ${Math.max(0, Math.min(100, ((numVal - min) / (max - min)) * 100))}%, var(--nix-border, #e5e7eb) ${Math.max(0, Math.min(100, ((numVal - min) / (max - min)) * 100))}%)`;
                        onChange?.(numVal, e);
                    }}
                    @blur=${() => {
                        field?.onBlur();
                    }}
                />
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
