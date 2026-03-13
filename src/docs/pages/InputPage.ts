import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Input } from "../../components/Input";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function InputPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Input</h1>
            <p class="doc-lead">Text fields for user input with labels and validation.</p>
            
            ${Usage({
                title: "Basic Usage",
                demo: html`
                    <div class="max-w-xs space-y-4">
                        ${Input({ placeholder: "Placeholder text..." })}
                        ${Input({ label: "Label", placeholder: "With a label" })}
                        ${Input({ label: "Required", placeholder: "Validation state", error: "This field is required" })}
                    </div>
                `,
                code: `Input({ label: "Email", type: "email" })`
            })}

            ${Usage({
                title: "Sizes",
                demo: html`
                    <div class="max-w-xs space-y-4">
                        ${Input({ size: "sm", placeholder: "Small input" })}
                        ${Input({ size: "md", placeholder: "Medium input" })}
                        ${Input({ size: "lg", placeholder: "Large input" })}
                    </div>
                `,
                code: `Input({ size: "sm" })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "type", type: "string", default: "'text'", description: "Native input type." },
                { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Input scale." },
                { name: "label", type: "string", default: "undefined", description: "Optional label." },
                { name: "error", type: "string | () => string | null", default: "undefined", description: "Validation message." }
            ])}
        </div>
    `;
}
