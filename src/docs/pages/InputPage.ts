import { html, createForm, validators } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

const { required, email, minLength } = validators;

export function InputPage(): NixTemplate {
    const form = createForm(
        { username: "", email: "" },
        {
            validators: {
                username: [required("Username is required"), minLength(3)],
                email: [required("Email is required"), email()],
            },
        }
    );

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

            ${Usage({
                title: "Form Integration",
                description: "Bind to createForm via the field prop for automatic value tracking and validation.",
                demo: html`
                    <div class="max-w-sm space-y-4">
                        ${Input({ label: "Username", placeholder: "min 3 chars", field: form.fields.username })}
                        ${Input({ label: "Email", type: "email", placeholder: "joe@example.com", field: form.fields.email })}
                        <div class="flex gap-2">
                            ${Button({ variant: "outline", size: "sm", children: "Reset", onClick: () => form.reset() })}
                            <div class="text-xs text-nix-text-muted self-center">
                                Valid: <span class="${() => form.valid.value ? 'text-green-600' : 'text-red-500'} font-mono font-bold">${() => String(form.valid.value)}</span>
                            </div>
                        </div>
                    </div>
                `,
                code: `const form = createForm(
    { username: "", email: "" },
    { validators: {
        username: [required(), minLength(3)],
        email: [required(), email()],
    }}
);

Input({ label: "Username", field: form.fields.username })
Input({ label: "Email", type: "email", field: form.fields.email })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "type", type: "string", default: "'text'", description: "Native input type." },
                { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Input scale." },
                { name: "label", type: "string", default: "undefined", description: "Optional label." },
                { name: "error", type: "string | () => string | null", default: "undefined", description: "Validation message." },
                { name: "field", type: "FieldState<string | number>", default: "undefined", description: "Bind to a createForm field for automatic state management." },
            ])}
        </div>
    `;
}
