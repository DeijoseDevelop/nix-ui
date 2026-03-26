import { html, signal } from "@deijose/nix-js";
import { Slider } from "../../components/Slider";

export function SliderPage() {
    const volume = signal(50);
    const brightness = signal(75);
    
    return html`
        <div class="space-y-6">
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight text-nix-text">Slider</h1>
                <p class="text-lg text-nix-text-muted">An input where the user selects a value from within a given range.</p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Basic Examples</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-8 max-w-md">
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
                    <p class="text-sm text-nix-text-muted">Current Brightness: <span class="font-semibold text-nix-primary">${() => brightness.value}%</span></p>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Disabled State & Error</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-8 max-w-md">
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
            </div>
        </div>
    `;
}
