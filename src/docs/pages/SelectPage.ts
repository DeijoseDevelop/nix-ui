import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Select } from "../../components/Select";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function SelectPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Select</h1>
            <p class="doc-lead">Pick options from a dropdown list.</p>
            
            ${Usage({
                title: "Standard Select",
                demo: Select({
                    label: "Choose a framework",
                    placeholder: "Select one...",
                    options: [
                        { value: "nix", label: "Nix.js" },
                        { value: "react", label: "React" },
                        { value: "vue", label: "Vue" },
                    ]
                }),
                code: `Select({
    label: "Framework",
    options: [ { value: "nix", label: "Nix.js" } ]
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "options", type: "SelectOption[]", default: "required", description: "List of value/label pairs." },
                { name: "value", type: "string | () => string", default: "''", description: "Current selected value." },
                { name: "placeholder", type: "string", default: "undefined", description: "Ghost option." },
                { name: "label", type: "string", default: "undefined", description: "Dropdown label." },
                { name: "error", type: "string | () => string | null", default: "undefined", description: "Validation message." }
            ])}
        </div>
    `;
}
