import { html } from "@deijose/nix-js";
import type { NixTemplate, FieldState } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export interface RatingProps {
    value?: number | (() => number);
    max?: number;
    size?: "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    readonly?: boolean;
    color?: string; // e.g. "text-yellow-400"
    class?: string;
    field?: FieldState<number>;
    /** Accessible label for the rating group */
    label?: string;
    onChange?: (value: number) => void;
}

let _ratingId = 0;

export function Rating(props: RatingProps): NixTemplate {
    const {
        value = 0,
        max = 5,
        size = "md",
        disabled = false,
        readonly = false,
        color = "text-yellow-400",
        class: className,
        field,
        label,
        onChange
    } = props;

    const instanceId = _ratingId++;
    const groupId = `nix-rating-group-${instanceId}`;
    const labelId = `nix-rating-label-${instanceId}`;
    const valueTextId = `nix-rating-valuetext-${instanceId}`;

    const valBind = field ? (() => field.value.value ?? 0) : (typeof value === 'function' ? value : () => value);
    const currentValue = () => typeof valBind === 'function' ? valBind() : valBind;

    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-10 h-10"
    };

    const isInteractive = !disabled && !readonly;

    // Generate value text for screen readers
    const getValueText = () => {
        const val = currentValue();
        const rounded = Math.round(val);
        if (rounded === 1) return "1 star";
        return `${rounded} stars out of ${max}`;
    };

    // Handle keyboard navigation
    const handleKeydown = (e: KeyboardEvent) => {
        if (!isInteractive) return;

        const val = currentValue();
        let newValue = val;

        switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
                e.preventDefault();
                newValue = Math.min(max, val + 1);
                break;
            case "ArrowLeft":
            case "ArrowDown":
                e.preventDefault();
                newValue = Math.max(0, val - 1);
                break;
            case "Home":
                e.preventDefault();
                newValue = 1;
                break;
            case "End":
                e.preventDefault();
                newValue = max;
                break;
            default:
                return;
        }

        if (newValue !== val) {
            if (field) field.value.value = newValue;
            onChange?.(newValue);
        }
    };

    const setValue = (starValue: number) => {
        if (!isInteractive) return;
        if (field) field.value.value = starValue;
        onChange?.(starValue);
    };

    return html`
        <div
            class=${cx(
        "inline-flex flex-col gap-1",
        className
    )}
        >
            ${label ? html`<span id=${labelId} class="text-sm font-medium text-nix-text">${label}</span>` : ""}
            <div
                id=${groupId}
                class=${cx(
        "inline-flex items-center gap-1",
        isInteractive ? "cursor-pointer" : "cursor-default",
        disabled ? "opacity-50 cursor-not-allowed" : ""
    )}
                role="radiogroup"
                aria-labelledby=${label ? labelId : undefined}
                aria-valuetext=${getValueText}
                aria-readonly=${readonly.toString()}
                aria-disabled=${disabled.toString()}
                tabindex=${isInteractive ? "0" : "-1"}
                @keydown=${handleKeydown}
            >
                ${Array.from({ length: max }, (_, i) => i + 1).map(starValue => {
        const radioId = `${groupId}-star-${starValue}`;
        const isChecked = () => Math.round(currentValue()) === starValue;

        return html`
                        <div class="inline-flex items-center">
                            <input
                                type="radio"
                                id=${radioId}
                                name=${groupId}
                                value=${starValue}
                                class="sr-only"
                                disabled=${disabled}
                                .checked=${isChecked()}
                                @change=${(e: Event) => {
                if (!isInteractive) return;
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    setValue(starValue);
                }
            }}
                            />
                            <label
                                for=${radioId}
                                role="radio"
                                aria-checked=${() => isChecked().toString()}
                                aria-label=${starValue + " star" + (starValue > 1 ? "s" : "")}
                                tabindex=${isInteractive ? "-1" : undefined}
                                class=${cx(
                "flex items-center justify-center p-0.5 transition-transform duration-150",
                sizeClasses[size],
                isInteractive ? "cursor-pointer active:scale-95 hover:scale-110" : ""
            )}
                                @click=${(e: MouseEvent) => {
                if (!isInteractive) {
                    e.preventDefault();
                } else {
                    setValue(starValue);
                }
            }}
                            >
                                <!-- Active star (colored) -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class=${cx(
                "transition-opacity duration-200",
                sizeClasses[size],
                isChecked() ? color : "text-nix-border",
                isInteractive ? "hover:text-nix-text-muted" : ""
            )}
                                    aria-hidden="true"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </label>
                        </div>
                    `;
    })}
            </div>
            ${isInteractive ? html`<span id=${valueTextId} class="sr-only">${getValueText}</span>` : ""}
        </div>
    `;
}
