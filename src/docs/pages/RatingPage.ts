import { html, signal } from "@deijose/nix-js";
import { Rating } from "../../components/Rating";

export function RatingPage() {
    const movieRating = signal(3);
    const customRating = signal(7);
    
    return html`
        <div class="space-y-6">
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight text-nix-text">Rating</h1>
                <p class="text-lg text-nix-text-muted">A star rating component for user feedback and scoring.</p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Basic Rating</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col items-start gap-4">
                    ${Rating({
                        value: () => movieRating.value,
                        onChange: (val) => movieRating.value = val,
                        max: 5
                    })}
                    <p class="text-sm text-nix-text-muted">You gave this <span class="font-semibold text-nix-primary">${() => movieRating.value}</span> out of 5 stars.</p>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Sizes & Custom Colors</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-6">
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-sm font-medium text-nix-text">Small</span>
                        ${Rating({ value: 2, max: 5, size: "sm" })}
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-sm font-medium text-nix-text">Medium</span>
                        ${Rating({ value: 3, max: 5, size: "md" })}
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-sm font-medium text-nix-text">Large (Purple)</span>
                        ${Rating({ value: 4, max: 5, size: "lg", color: "text-purple-500" })}
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-sm font-medium text-nix-text">X-Large (Pink)</span>
                        ${Rating({ value: 5, max: 5, size: "xl", color: "text-pink-500" })}
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Readonly / Disabled</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-nix-text">Read Only (Average Score Example)</span>
                        ${Rating({ value: 4.5, max: 5, readonly: true, size: "lg" })}
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-nix-text">Disabled</span>
                        ${Rating({ value: 2, max: 5, disabled: true })}
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Custom Max Value (Out of 10)</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-4 items-start">
                    ${Rating({
                        value: () => customRating.value,
                        onChange: (val) => customRating.value = val,
                        max: 10,
                        color: "text-blue-500"
                    })}
                    <p class="text-sm text-nix-text-muted">Masterpiece rating: <span class="font-semibold text-nix-primary">${() => customRating.value}</span> / 10</p>
                </div>
            </div>
        </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">API Reference</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left border-collapse">
                        <thead class="bg-nix-bg-subtle text-nix-text border-b border-nix-border">
                            <tr>
                                <th class="p-3 font-semibold">Prop</th>
                                <th class="p-3 font-semibold">Type</th>
                                <th class="p-3 font-semibold">Default</th>
                                <th class="p-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-nix-border">
                            <tr><td class="p-3 font-mono text-nix-primary">value</td><td class="p-3">number | () => number</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">The current rating value.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">max</td><td class="p-3">number</td><td class="p-3">5</td><td class="p-3 flex-1 break-words">Maximum rating value (number of stars).</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">onChange</td><td class="p-3">(value: number) => void</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Callback when a star is clicked.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">size</td><td class="p-3">"sm" | "md" | "lg" | "xl"</td><td class="p-3">"md"</td><td class="p-3 flex-1 break-words">Size of the stars.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">color</td><td class="p-3">string</td><td class="p-3">"text-yellow-400"</td><td class="p-3 flex-1 break-words">Tailwind text color class for active stars.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">readonly</td><td class="p-3">boolean</td><td class="p-3">false</td><td class="p-3 flex-1 break-words">If true, the rating becomes read-only output.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">disabled</td><td class="p-3">boolean</td><td class="p-3">false</td><td class="p-3 flex-1 break-words">If true, completely disables interaction.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
