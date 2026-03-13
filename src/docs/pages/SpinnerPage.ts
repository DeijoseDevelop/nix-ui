import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Spinner } from "../../components/Spinner";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function SpinnerPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Spinner</h1>
            <p class="doc-lead">Visual indicators for loading states.</p>
            
            ${Usage({
                title: "Variants",
                demo: html`
                    <div class="flex gap-8 items-center">
                        ${Spinner({ variant: "border", size: "lg" })}
                        ${Spinner({ variant: "dots", size: "lg" })}
                        ${Spinner({ variant: "pulse", size: "lg" })}
                    </div>
                `,
                code: `Spinner({ variant: "border", size: "lg" })
Spinner({ variant: "dots", size: "lg" })
Spinner({ variant: "pulse", size: "lg" })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                    { name: "variant", type: "'border' | 'dots' | 'pulse'", default: "'border'", description: "Visual style." },
                    { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "The spinner scale." },
                    { name: "color", type: "string", default: "'text-nix-primary'", description: "CSS color class (Tailwind)." },
                    { name: "label", type: "string", default: "'Loading'", description: "Accessibility label." },
                    { name: "class", type: "string", default: "''", description: "Additional CSS classes." },
                    { name: "style", type: "string", default: "''", description: "Inline CSS styles." },
                ])}
        </div>
    `;
}
