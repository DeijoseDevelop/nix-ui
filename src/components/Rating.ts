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
        onChange
    } = props;

    const valBind = field ? (() => field.value.value ?? 0) : (typeof value === 'function' ? value : value);
    const idPrefix = `nix-rating-${_ratingId++}`;
    
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-10 h-10"
    };

    const isInteractive = !disabled && !readonly;

    // Create array from max down to 1 for the flex-row-reverse CSS trick
    const stars = Array.from({ length: max }, (_, i) => max - i);

    return html`
        <div 
            class=${cx(
                "inline-flex items-center gap-1",
                isInteractive ? "cursor-pointer" : "cursor-default",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                className
            )}
            role="slider"
            aria-valuemin="1"
            aria-valuemax="${max}"
            aria-valuenow=${() => {
                const current = typeof valBind === 'function' ? valBind() : valBind;
                return current;
            }}
        >
            <div class=${cx(
                "flex flex-row-reverse justify-end items-center",
                isInteractive ? "" : "pointer-events-none"
            )}>
                ${stars.map(starValue => {
                    const inputId = `${idPrefix}-${starValue}`;
                    
                    return html`
                        <input 
                            type="radio" 
                            id=${inputId} 
                            name=${idPrefix} 
                            value=${starValue}
                            class="hidden peer/input"
                            disabled=${disabled}
                            checked=${() => {
                                const currentVal = typeof valBind === 'function' ? valBind() : valBind;
                                return Math.round(currentVal) === starValue;
                            }}
                            @change=${(e: Event) => {
                                if (!isInteractive) return;
                                const target = e.target as HTMLInputElement;
                                if (target.checked) {
                                    if (field) field.value.value = starValue;
                                    field?.onInput(e);
                                    onChange?.(starValue);
                                }
                            }}
                        />
                        <label 
                            for=${inputId}
                            class=${cx(
                                "peer/label relative flex items-center justify-center p-0.5 transition-transform duration-150",
                                sizeClasses[size],
                                isInteractive ? "cursor-pointer active:scale-95" : "",
                                // Tailwind magic: Toggle active/inactive star opacity based on peer state
                                "[&_.star-active]:opacity-0 [&_.star-inactive]:opacity-100",
                                "peer-checked/input:[&_.star-active]:opacity-100 peer-checked/input:[&_.star-inactive]:opacity-0",
                                isInteractive ? "hover:[&_.star-active]:opacity-100 hover:[&_.star-inactive]:opacity-0 peer-hover/label:[&_.star-active]:opacity-100 peer-hover/label:[&_.star-inactive]:opacity-0" : ""
                            )}
                            @click=${(e: MouseEvent) => {
                                if (!isInteractive) {
                                    e.preventDefault();
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
                                class=${cx("star-active absolute inset-0 transition-opacity duration-200", color)}
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <!-- Inactive star -->
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="star-inactive absolute inset-0 text-nix-border transition-opacity duration-200 hover:text-nix-text-muted"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </label>
                    `;
                })}
            </div>
        </div>
    `;
}
