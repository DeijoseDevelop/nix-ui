import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Tooltip } from "../../components/Tooltip";
import { Button } from "../../components/Button";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function TooltipPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Tooltip</h1>
            <p class="doc-lead">Brief description that appears on focus or hover.</p>
            
            ${Usage({
                title: "Positions",
                demo: html`
                    <div class="flex flex-wrap gap-12 p-12 justify-center">
                        ${Tooltip({ position: "top", text: "Tooltip on Top", children: Button({ variant: "outline", children: "Top" }) })}
                        ${Tooltip({ position: "bottom", text: "Tooltip on Bottom", children: Button({ variant: "outline", children: "Bottom" }) })}
                        ${Tooltip({ position: "left", text: "Tooltip on Left", children: Button({ variant: "outline", children: "Left" }) })}
                        ${Tooltip({ position: "right", text: "Tooltip on Right", children: Button({ variant: "outline", children: "Right" }) })}
                    </div>
                `,
                code: `Tooltip({ text: "Help text", children: html\`<button>Hover me</button>\` })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "text", type: "string", default: "required", description: "Content of the tooltip." },
                { name: "position", type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: "Where to show the tooltip." },
                { name: "children", type: "NixUIChildren", default: "required", description: "The element being described." }
            ])}
        </div>
    `;
}
