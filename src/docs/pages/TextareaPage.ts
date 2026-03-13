import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Textarea } from "../../components/Textarea";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function TextareaPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Textarea</h1>
            <p class="doc-lead">Multi-line text input for longer responses.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="max-w-xs space-y-4">
                        ${Textarea({ placeholder: "Tell us more..." })}
                        ${Textarea({ label: "Biography", placeholder: "Write something about yourself" })}
                    </div>
                `,
                code: `Textarea({ label: "Bio", placeholder: "..." })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "label", type: "string", default: "undefined", description: "Field label." },
                { name: "error", type: "string | () => string", default: "undefined", description: "Error message." },
                { name: "rows", type: "number", default: "3", description: "Initial height." },
                { name: "placeholder", type: "string", default: "''", description: "Hint text." }
            ])}
        </div>
    `;
}
