import { html } from "@deijose/nix-js";
import type { NixTemplate, FieldState } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export interface RadioOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    options: RadioOption[];
    name?: string;
    value?: string | (() => string);
    label?: string;
    error?: string | (() => string | null);
    orientation?: "horizontal" | "vertical";
    class?: string;
    field?: FieldState<string>;
    onChange?: (value: string, e: Event) => void;
}

let _radioGroupId = 0;

export function RadioGroup(props: RadioGroupProps): NixTemplate {
    const {
        options,
        name: manualName,
        value,
        label,
        error,
        orientation = "vertical",
        class: className,
        field,
        onChange,
    } = props;

    const groupName = manualName || `nix-radio-group-${_radioGroupId++}`;

    // Resolve bindings giving priority to field over manual props
    const valBind = field ? (() => String(field.value.value ?? "")) : (typeof value === 'function' ? value : value);
    const errBind = field ? (() => field.error.value) : (typeof error === 'function' ? error : error);

    const containerClass = cx(
        "flex",
        orientation === "vertical" ? "flex-col gap-3" : "flex-row gap-6 flex-wrap",
        className
    );

    return html`
        <div class="flex flex-col gap-1.5" role="radiogroup" aria-labelledby="${groupName}-label">
            ${label 
                ? html`<legend id="${groupName}-label" class="text-sm font-medium text-nix-text">${label}</legend>`
                : ""}
            
            <div class=${containerClass}>
                ${options.map((opt, i) => {
                    const id = `${groupName}-opt-${i}`;
                    const currentErr = typeof errBind === 'function' ? errBind() : errBind;
                    const isError = !!currentErr;

                    return html`
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input
                                    id=${id}
                                    name=${groupName}
                                    type="radio"
                                    value=${opt.value}
                                    disabled=${opt.disabled}
                                    checked=${() => {
                                        const currentVal = typeof valBind === 'function' ? valBind() : valBind;
                                        return currentVal === opt.value;
                                    }}
                                    @change=${(e: Event) => {
                                        const target = e.target as HTMLInputElement;
                                        if (target.checked) {
                                            if (field) field.value.value = opt.value;
                                            field?.onInput(e);
                                            onChange?.(opt.value, e);
                                        }
                                    }}
                                    @blur=${() => {
                                        field?.onBlur();
                                    }}
                                    class=${cx(
                                        "peer h-4 w-4 appearance-none rounded-full border border-nix-border bg-nix-bg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 checked:border-nix-primary checked:bg-nix-primary",
                                        isError ? "border-nix-error focus:ring-nix-error/30" : "focus:ring-nix-primary/30"
                                    )}
                                />
                                <!-- Custom dot for radio inside -->
                                <div class="pointer-events-none absolute left-[4px] top-[4px] h-2 w-2 rounded-full bg-white opacity-0 transition-opacity peer-checked:opacity-100"></div>
                            </div>
                            <div class="ml-3 text-sm">
                                <label for=${id} class=${cx("font-medium select-none", opt.disabled ? "text-nix-text-muted cursor-not-allowed opacity-50" : "text-nix-text cursor-pointer")}>
                                    ${opt.label}
                                </label>
                                ${opt.description 
                                    ? html`<p class=${cx("text-nix-text-muted select-none", opt.disabled ? "opacity-50" : "")}>${opt.description}</p>`
                                    : ""}
                            </div>
                        </div>
                    `;
                })}
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
