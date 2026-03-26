import { html, createForm } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Toggle } from "../../components/Toggle";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function TogglePage(): NixTemplate {
    const form = createForm({ notifications: false, darkMode: true });

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

            ${Usage({
                title: "Sizes",
                demo: html`
                    <div class="space-y-4">
                        ${Toggle({ label: "Small", size: "sm" })}
                        ${Toggle({ label: "Medium", size: "md", checked: true })}
                        ${Toggle({ label: "Large", size: "lg" })}
                    </div>
                `,
                code: `Toggle({ label: "Small", size: "sm" })`
            })}

            ${Usage({
                title: "Form Integration",
                description: "Bind to createForm via the field prop for reactive state management.",
                demo: html`
                    <div class="space-y-4">
                        ${Toggle({ label: "Email notifications", field: form.fields.notifications })}
                        ${Toggle({ label: "Dark mode", field: form.fields.darkMode })}
                        <div class="text-xs text-nix-text-muted">
                            Notifications: <span class="font-mono font-bold text-nix-primary">${() => String(form.fields.notifications.value.value)}</span> · 
                            Dark mode: <span class="font-mono font-bold text-nix-primary">${() => String(form.fields.darkMode.value.value)}</span>
                        </div>
                    </div>
                `,
                code: `const form = createForm({ notifications: false, darkMode: true });

Toggle({ label: "Email notifications", field: form.fields.notifications })
Toggle({ label: "Dark mode", field: form.fields.darkMode })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "label", type: "string", default: "undefined", description: "Input label text." },
                { name: "checked", type: "boolean | Signal<boolean>", default: "false", description: "Current state." },
                { name: "disabled", type: "boolean | Signal<boolean>", default: "false", description: "Disable interaction." },
                { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Toggle scale." },
                { name: "onChange", type: "(checked: boolean) => void", default: "undefined", description: "State change hook." },
                { name: "field", type: "FieldState<boolean>", default: "undefined", description: "Bind to a createForm field." },
            ])}
        </div>
    `;
}
