import { html, createForm, validators } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Select } from "../../components/Select";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

const { required } = validators;

export function SelectPage(): NixTemplate {
    const form = createForm(
        { role: "" },
        { validators: { role: [required("Please select a role")] } }
    );

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

            ${Usage({
                title: "Form Integration",
                description: "Bind to createForm with the field prop for reactive validation.",
                demo: html`
                    <div class="max-w-xs space-y-4">
                        ${Select({
                            label: "User Role",
                            placeholder: "Pick a role...",
                            field: form.fields.role,
                            options: [
                                { value: "admin", label: "Administrator" },
                                { value: "editor", label: "Editor" },
                                { value: "viewer", label: "Viewer" },
                            ]
                        })}
                        <div class="text-xs text-nix-text-muted">
                            Selected: <span class="font-mono font-bold text-nix-primary">${() => form.fields.role.value.value || "none"}</span>
                        </div>
                    </div>
                `,
                code: `const form = createForm(
    { role: "" },
    { validators: { role: [required("Please select a role")] } }
);

Select({
    label: "User Role",
    placeholder: "Pick a role...",
    field: form.fields.role,
    options: [
        { value: "admin", label: "Administrator" },
        { value: "editor", label: "Editor" },
    ]
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "options", type: "SelectOption[]", default: "required", description: "List of value/label pairs." },
                { name: "value", type: "string | () => string", default: "''", description: "Current selected value." },
                { name: "placeholder", type: "string", default: "undefined", description: "Ghost option." },
                { name: "label", type: "string", default: "undefined", description: "Dropdown label." },
                { name: "error", type: "string | () => string | null", default: "undefined", description: "Validation message." },
                { name: "field", type: "FieldState<string>", default: "undefined", description: "Bind to a createForm field." },
            ])}
        </div>
    `;
}
