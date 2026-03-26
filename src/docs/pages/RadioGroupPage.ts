import { html, signal } from "@deijose/nix-js";
import { RadioGroup } from "../../components/RadioGroup";

export function RadioGroupPage() {
    const selectedFruits = signal("apple");
    const selectedSize = signal("md");
    
    return html`
        <div class="space-y-6">
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight text-nix-text">RadioGroup</h1>
                <p class="text-lg text-nix-text-muted">A set of checkable buttons, known as radio buttons, where only one can be checked at a time.</p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Basic (Vertical)</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-6 items-start">
                    ${RadioGroup({
                        label: "Select your favorite fruit:",
                        value: () => selectedFruits.value,
                        onChange: (v) => selectedFruits.value = v,
                        options: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                            { label: "Orange", value: "orange" },
                            { label: "Strawberry (Unavailable)", value: "strawberry", disabled: true }
                        ]
                    })}
                    <p class="text-sm text-nix-text-muted">Selected: <span class="font-semibold text-nix-primary">${() => selectedFruits.value}</span></p>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Horizontal with Descriptions</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle">
                    ${RadioGroup({
                        label: "Hardware Size",
                        orientation: "horizontal",
                        value: () => selectedSize.value,
                        onChange: (v) => selectedSize.value = v,
                        options: [
                            { label: "Small", value: "sm", description: "Minimal processing block" },
                            { label: "Medium", value: "md", description: "Standard compute node" },
                            { label: "Large", value: "lg", description: "High-performance cluster" }
                        ]
                    })}
                </div>
            </div>
        </div>
    `;
}
