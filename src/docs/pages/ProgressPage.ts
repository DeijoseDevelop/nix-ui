import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Progress } from "../../components/Progress";
import { Button } from "../../components/Button";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function ProgressPage(): NixTemplate {
    const dynamicValue = signal(35);

    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Progress</h1>
            <p class="doc-lead">Visual progress indicators with smooth animations.</p>
            
            ${Usage({
                title: "Variants",
                demo: html`
                    <div class="space-y-4 max-w-md">
                        ${Progress({ value: 60, variant: "primary", showLabel: true })}
                        ${Progress({ value: 80, variant: "success", showLabel: true })}
                        ${Progress({ value: 45, variant: "warning", showLabel: true })}
                        ${Progress({ value: 25, variant: "error", showLabel: true })}
                    </div>
                `,
                code: `Progress({ value: 60, variant: "success", showLabel: true })`
            })}

            ${Usage({
                title: "Sizes",
                demo: html`
                    <div class="space-y-4 max-w-md">
                        ${Progress({ value: 50, size: "sm" })}
                        ${Progress({ value: 50, size: "md" })}
                        ${Progress({ value: 50, size: "lg", showLabel: true })}
                    </div>
                `,
                code: `Progress({ value: 50, size: "lg" })`
            })}

            ${Usage({
                title: "Striped & Animated",
                demo: html`
                    <div class="space-y-4 max-w-md">
                        ${Progress({ value: 70, striped: true, showLabel: true })}
                        ${Progress({ value: 55, striped: true, animated: true, variant: "success", showLabel: true })}
                    </div>
                `,
                code: `Progress({ value: 70, striped: true, animated: true })`
            })}

            ${Usage({
                title: "Dynamic Value",
                demo: html`
                    <div class="space-y-4 max-w-md">
                        ${Progress({ value: () => dynamicValue.value, showLabel: true, variant: "primary", size: "lg" })}
                        <div class="flex gap-2">
                            ${Button({ size: "sm", variant: "outline", children: "−10", onClick: () => dynamicValue.value = Math.max(0, dynamicValue.value - 10) })}
                            ${Button({ size: "sm", variant: "outline", children: "+10", onClick: () => dynamicValue.value = Math.min(100, dynamicValue.value + 10) })}
                            ${Button({ size: "sm", variant: "ghost", children: "Reset", onClick: () => dynamicValue.value = 35 })}
                        </div>
                    </div>
                `,
                code: `const val = signal(35);
Progress({ value: () => val.value, showLabel: true })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "value", type: "number | () => number", default: "required", description: "Progress 0–100. Supports reactive functions." },
                { name: "variant", type: "'primary' | 'success' | 'warning' | 'error'", default: "'primary'", description: "Color theme." },
                { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Bar height." },
                { name: "showLabel", type: "boolean", default: "false", description: "Show percentage text above." },
                { name: "striped", type: "boolean", default: "false", description: "Striped pattern." },
                { name: "animated", type: "boolean", default: "false", description: "Animate the stripes." },
                { name: "label", type: "string | (value) => string", default: "undefined", description: "Custom label." },
            ])}
        </div>
    `;
}
