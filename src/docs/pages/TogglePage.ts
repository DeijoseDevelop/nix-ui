import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Toggle } from "../../components/Toggle";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function TogglePage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Toggle</h1>
            <p class="doc-lead">A switch-style checkbox for immediate actions.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="space-y-4">
                        ${Toggle({ label: "Enable notifications" })}
                        ${Toggle({ label: "Dark mode", checked: true })}
                        ${Toggle({ label: "Disabled toggle", disabled: true })}
                    </div>
                `,
                code: `Toggle({ label: "Active", checked: true })`
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
