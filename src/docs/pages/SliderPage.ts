import { html, signal } from "@deijose/nix-js";
import { Slider } from "../../components/Slider";
import { PropTable } from "../PropTable";
import { Usage } from "../Usage";

export function SliderPage() {
    const volume = signal(50);
    const brightness = signal(75);

    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Slider</h1>
            <p class="doc-lead">An input where the user selects a value from within a given range.</p>

            ${Usage({
        title: "Basic Examples",
        demo: html`
                    <div class="max-w-sm">
                        ${Slider({
            label: "Volume",
            value: () => volume.value,
            onChange: (v) => volume.value = v,
            showValue: true,
            min: 0,
            max: 100
        })}
                        ${Slider({
            label: "Brightness",
            value: () => brightness.value,
            onChange: (v) => brightness.value = v,
            showValue: false,
            min: 0,
            max: 100,
            class: "mt-4"
        })}
                    </div>
                `,
        code: `Slider({
    label: "Volume",
    value: () => volume.value,
    onChange: (v) => volume.value = v,
    showValue: true,
    min: 0,
    max: 100
})`
    })}

            ${Usage({
        title: "Disabled State & Error",
        demo: html`
                    <div class="max-w-sm">
                        ${Slider({
            label: "Disabled Setting",
            value: 30,
            disabled: true,
            showValue: true
        })}
                        ${Slider({
            label: "Critical Threshold",
            value: 95,
            error: "Value exceeds safe limits",
            showValue: true
        })}
                    </div>
                `,
        code: `Slider({
    label: "Volume",
    value: () => volume.value,
    onChange: (v) => volume.value = v,
    showValue: true,
    min: 0,
    max: 100
})`
    })}

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">API Reference</h2>
                ${PropTable([
        { name: "min", type: "number", default: "0", description: "Minimum value accepted by the slider." },
        { name: "max", type: "number", default: "100", description: "Maximum value accepted by the slider." },
        { name: "step", type: "number", default: "1", description: "Increment used when dragging or using keyboard controls." },
        { name: "value", type: "number | (() => number)", default: "0", description: "Current slider value." },
        { name: "label", type: "string", default: "undefined", description: "Label rendered above the slider." },
        { name: "error", type: "string | (() => string | null)", default: "undefined", description: "Validation error message shown below the control." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables user interaction." },
        { name: "showValue", type: "boolean", default: "false", description: "Shows the current value in the header row." },
        { name: "class", type: "string", default: "undefined", description: "Additional wrapper classes." },
        { name: "field", type: "FieldState<number>", default: "undefined", description: "Bind to a createForm field for reactive validation." },
        { name: "ariaLabel", type: "string", default: "undefined", description: "Accessible label used when no visible label is provided." },
        { name: "valueText", type: "(value: number, percentage: number) => string", default: "undefined", description: "Custom formatter for aria-valuetext and displayed values." },
        { name: "onChange", type: "(value: number, e: Event) => void", default: "undefined", description: "Called whenever the value changes." },
    ])}
            </div>
        </div>
    `;
}
