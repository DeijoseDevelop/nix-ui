import { html, createForm, validators } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Checkbox } from "../../components/Checkbox";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

const { required } = validators;

export function CheckboxPage(): NixTemplate {
    const form = createForm(
        { terms: false, newsletter: false },
        { validators: { terms: [required("You must accept the terms")] } }
    );

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

            ${Usage({
                title: "Form Integration",
                description: "Bind to createForm via the field prop. Validation runs on blur/submit.",
                demo: html`
                    <div class="space-y-4">
                        ${Checkbox({ label: "Subscribe to newsletter", field: form.fields.newsletter })}
                        ${Checkbox({ label: "I accept the Terms of Service *", field: form.fields.terms })}
                        <div class="text-xs text-nix-text-muted">
                            Terms accepted: <span class="font-mono font-bold text-nix-primary">${() => String(form.fields.terms.value.value)}</span>
                        </div>
                    </div>
                `,
                code: `const form = createForm(
    { terms: false },
    { validators: { terms: [required("Must accept terms")] } }
);

Checkbox({ label: "I accept the Terms", field: form.fields.terms })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "label", type: "string", default: "undefined", description: "Input label text." },
                { name: "checked", type: "boolean | Signal<boolean>", default: "false", description: "Current state." },
                { name: "disabled", type: "boolean | Signal<boolean>", default: "false", description: "Disable interaction." },
                { name: "onChange", type: "(checked: boolean) => void", default: "undefined", description: "State change hook." },
                { name: "field", type: "FieldState<boolean>", default: "undefined", description: "Bind to a createForm field." },
            ])}
        </div>
    `;
}
