import { html, createForm, validators } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Textarea } from "../../components/Textarea";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

const { required, minLength } = validators;

export function TextareaPage(): NixTemplate {
    const form = createForm(
        { bio: "" },
        { validators: { bio: [required("Bio is required"), minLength(10)] } }
    );

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

            ${Usage({
                title: "Form Integration",
                description: "Bind to createForm with the field prop. Errors show after blur.",
                demo: html`
                    <div class="max-w-sm space-y-4">
                        ${Textarea({ label: "Biography", placeholder: "At least 10 characters...", field: form.fields.bio })}
                        <div class="text-xs text-nix-text-muted">
                            Length: <span class="font-mono font-bold text-nix-primary">${() => String((form.fields.bio.value.value as string).length)}</span> chars
                        </div>
                    </div>
                `,
                code: `const form = createForm(
    { bio: "" },
    { validators: { bio: [required(), minLength(10)] } }
);

Textarea({ label: "Biography", field: form.fields.bio })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "label", type: "string", default: "undefined", description: "Field label." },
                { name: "error", type: "string | () => string", default: "undefined", description: "Error message." },
                { name: "rows", type: "number", default: "3", description: "Initial height." },
                { name: "placeholder", type: "string", default: "''", description: "Hint text." },
                { name: "field", type: "FieldState<string>", default: "undefined", description: "Bind to a createForm field." },
            ])}
        </div>
    `;
}
