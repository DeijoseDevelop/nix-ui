import { html } from "@deijose/nix-js";
import type { NixTemplate, FieldState } from "@deijose/nix-js";
import { cx } from "../utils/cx";
import { nixKeyboardSlider, nixSliderValueText } from "../utils/a11y/nixKeyboardSlider";

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
    /** Accessible label for the slider */
    ariaLabel?: string;
    /** Custom value text formatter */
    valueText?: (value: number, percentage: number) => string;
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
        ariaLabel,
        valueText,
        onChange,
    } = props;

    const instanceId = _sliderId++;
    const id = `nix-slider-${instanceId}`;
    const labelId = `nix-slider-label-${instanceId}`;
    const valueId = `nix-slider-value-${instanceId}`;
    const errorId = `nix-slider-error-${instanceId}`;

    const valBind = field ? (() => field.value.value ?? min) : (typeof value === 'function' ? value : () => value);
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const baseClass = "w-full focus:outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-nix-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nix-primary [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:focus:ring-4 [&::-webkit-slider-thumb]:focus:ring-nix-primary/20 hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95";

    // Progress bar calculation
    const progressStyle = () => {
        const currentVal = typeof valBind === 'function' ? valBind() : valBind;
        const percentage = Math.max(0, Math.min(100, ((currentVal - min) / (max - min)) * 100));
        const color = typeof errBind === 'function' && errBind() ? 'var(--nix-error, #ef4444)' : 'var(--nix-primary, #10b981)';
        return `background: linear-gradient(to right, ${color} ${percentage}%, var(--nix-border, #e5e7eb) ${percentage}%)`;
    };

    // Get current value for aria-valuetext
    const getCurrentValue = () => {
        return typeof valBind === 'function' ? valBind() : valBind;
    };

    // Generate aria-valuetext
    const getValueText = () => {
        const currentValue = getCurrentValue();
        if (valueText) {
            const percentage = Math.round(((currentValue - min) / (max - min)) * 100);
            return valueText(currentValue, percentage);
        }
        return nixSliderValueText(currentValue, min, max);
    };

    // Setup keyboard navigation after mount
    const setupKeyboard = (input: HTMLInputElement) => {
        const keyboardSlider = nixKeyboardSlider({
            element: input,
            min,
            max,
            step,
            onChange: (newValue) => {
                if (field) field.value.value = newValue;
                onChange?.(newValue, new Event('input'));
            },
        });
        keyboardSlider.activate();
    };

    return html`
        <div class="flex flex-col gap-1.5 w-full ${className ?? ""}">
            ${label || showValue ? html`
                <div class="flex justify-between items-center">
                    ${label ? html`<label id=${labelId} for=${id} class="text-sm font-medium text-nix-text">${label}</label>` : html`<span></span>`}
                    ${showValue ? html`<span id=${valueId} class="text-xs font-semibold px-2 py-0.5 rounded-full bg-nix-bg text-nix-text border border-nix-border shadow-sm">${() => {
                const currentValue = getCurrentValue();
                return valueText ? valueText(currentValue, Math.round(((currentValue - min) / (max - min)) * 100)) : `${currentValue}`;
            }}</span>` : ""}
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
                    aria-labelledby=${label ? labelId : ariaLabel ? undefined : undefined}
                    aria-label=${ariaLabel || (label ? undefined : "Slider")}
                    aria-valuemin=${min}
                    aria-valuemax=${max}
                    aria-valuenow=${() => getCurrentValue()}
                    aria-valuetext=${getValueText}
                    aria-invalid=${() => (typeof errBind === 'function' && errBind() ? "true" : undefined)}
                    aria-describedby=${() => {
            const currentError = typeof errBind === 'function' ? errBind() : errBind;
            return currentError ? errorId : undefined;
        }}
                    @mounted=${(e: CustomEvent) => setupKeyboard(e.target as HTMLInputElement)}
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
                ? html`<span id=${errorId} class="text-xs text-nix-error" role="alert">${currentError}</span>`
                : "";
        }}
        </div>
    `;
}
