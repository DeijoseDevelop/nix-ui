import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Checkbox } from "../../components/Checkbox";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function CheckboxPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Checkbox</h1>
            <p class="doc-lead">Binary selection for forms and settings.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="space-y-4">
                        ${Checkbox({ label: "Accept terms and conditions" })}
                        ${Checkbox({ label: "Subscribe to newsletter", checked: true })}
                        ${Checkbox({ label: "Disabled option", disabled: true })}
                    </div>
                `,
                code: `Checkbox({ label: "Remember me", checked: true })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "label", type: "string", default: "undefined", description: "Input label text." },
                { name: "checked", type: "boolean | Signal<boolean>", default: "false", description: "Current state." },
                { name: "disabled", type: "boolean | Signal<boolean>", default: "false", description: "Disable interaction." },
                { name: "onChange", type: "(checked: boolean) => void", default: "undefined", description: "State change hook." }
            ])}
        </div>
    `;
}
