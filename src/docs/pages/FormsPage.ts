import { html, signal, createForm, nixField, nixFieldArray, validators } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { Checkbox } from "../../components/Checkbox";

import { Button } from "../../components/Button";
import { showToast } from "../../components/Toast";

const { required, email, minLength } = validators;

export function FormsPage(): NixTemplate {
    // ── Full Form Demo ─────────────────────────────────────────────────────
    const form = createForm({
        name: "",
        email: "",
        role: "user",
        bio: "",
        terms: false
    }, {
        validators: {
            name: [required("Please enter your name"), minLength(3)],
            email: [required(), email()],
            terms: [required("Must accept terms")]
        }
    });

    const isSubmitting = signal(false);

    const onSubmit = form.handleSubmit(async (values) => {
        isSubmitting.value = true;
        await new Promise(r => setTimeout(r, 1500));
        showToast("Form submitted successfully!", "success", { title: "Success" });
        console.log("Form values:", values);
        isSubmitting.value = false;
        form.reset();
    });

    // ── Standalone nixField Demo ───────────────────────────────────────────
    const singleField = nixField("", [required("This field is required"), minLength(5)]);

    // ── nixFieldArray Demo ─────────────────────────────────────────────────
    const teamMembers = nixFieldArray<{ name: string; email: string }>(
        [{ name: "", email: "" }],
        {
            name: [required("Name is required")],
            email: [required("Email is required"), email()],
        }
    );

    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Forms & Validation</h1>
            <p class="doc-lead">Complete reactive forms using <code>createForm</code>, <code>nixField</code>, and <code>nixFieldArray</code>.</p>

            <!-- ── createForm ──────────────────────────────────────────── -->
            <h2 class="doc-h2">createForm()</h2>
            <p class="doc-p">Manages a full form with reactive fields, built-in validators, schema-level validation, and async submit handling.</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 mb-12">
                <div class="p-6 border rounded-nix-xl bg-nix-bg shadow-nix-md">
                    <form @submit=${onSubmit} class="space-y-4">
                        ${Input({
        label: "Full Name",
        placeholder: "Joe Doe",
        field: form.fields.name
    })}
                        ${Input({
        label: "Email Address",
        type: "email",
        placeholder: "joe@example.com",
        field: form.fields.email
    })}
                        ${Select({
        label: "User Role",
        field: form.fields.role,
        options: [
            { value: "user", label: "Standard User" },
            { value: "admin", label: "Administrator" },
            { value: "editor", label: "Content Editor" },
        ]
    })}
                        ${Textarea({
        label: "Biography",
        placeholder: "Tell us about yourself...",
        field: form.fields.bio
    })}
                        ${Checkbox({
        label: "I agree to the Terms of Service",
        field: form.fields.terms
    })}
                        
                        <div class="pt-4">
                            ${Button({
        type: "submit",
        variant: "primary",
        class: "w-full",
        loading: isSubmitting,
        children: "Register Account"
    })}
                        </div>
                    </form>
                </div>

                <div class="space-y-4">
                    <div class="p-4 bg-nix-surface rounded-nix-lg border shadow-nix-sm">
                        <h4 class="font-bold text-xs uppercase tracking-widest text-nix-text-muted mb-3">Live Values</h4>
                        <pre class="text-[10px] text-nix-primary">${() => JSON.stringify(form.values.value, null, 2)}</pre>
                    </div>
                    <div class="p-4 bg-nix-surface rounded-nix-lg border shadow-nix-sm">
                        <h4 class="font-bold text-xs uppercase tracking-widest text-nix-text-muted mb-3">Form State</h4>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div class="flex justify-between"><span>Dirty:</span> <span class="font-bold font-mono text-nix-primary">${() => String(form.dirty.value)}</span></div>
                            <div class="flex justify-between"><span>Touched:</span> <span class="font-bold font-mono text-nix-primary">${() => String(form.touched.value)}</span></div>
                            <div class="flex justify-between"><span>Valid:</span> <span class="${() => form.valid.value ? 'text-green-600' : 'text-red-600'} font-bold font-mono">${() => String(form.valid.value)}</span></div>
                            <div class="flex justify-between"><span>Submitting:</span> <span class="font-bold font-mono text-nix-primary">${() => String(form.isSubmitting.value)}</span></div>
                            <div class="flex justify-between"><span>Submit count:</span> <span class="font-bold font-mono text-nix-primary">${() => String(form.submitCount.value)}</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-nix-surface rounded-nix-lg border shadow-nix-sm">
                        <h4 class="font-bold text-xs uppercase tracking-widest text-nix-text-muted mb-3">Code</h4>
                        <pre class="text-[10px] text-nix-text overflow-x-auto"><code>const form = createForm(
  { name: "", email: "", role: "user", bio: "", terms: false },
  { validators: {
      name: [required(), minLength(3)],
      email: [required(), email()],
      terms: [required("Must accept terms")],
  }}
);

// Bind in template:
Input({ label: "Name", field: form.fields.name })
Checkbox({ label: "Terms", field: form.fields.terms })

// Submit:
const onSubmit = form.handleSubmit(async (values) => { ... });
&lt;form @submit=\${onSubmit}&gt;...&lt;/form&gt;</code></pre>
                    </div>
                </div>
            </div>

            <!-- ── nixField ────────────────────────────────────────────── -->
            <h2 class="doc-h2">nixField()</h2>
            <p class="doc-p">Creates a standalone reactive field — useful when you need a single validated input without a full form.</p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 mb-12">
                <div class="p-6 border rounded-nix-xl bg-nix-bg shadow-nix-md space-y-4">
                    ${Input({ label: "Standalone field", placeholder: "Min 5 characters...", field: singleField })}
                    <div class="text-xs text-nix-text-muted space-y-1">
                        <div>Value: <span class="font-mono font-bold text-nix-primary">${() => `"${singleField.value.value}"`}</span></div>
                        <div>Dirty: <span class="font-mono font-bold">${() => String(singleField.dirty.value)}</span></div>
                        <div>Touched: <span class="font-mono font-bold">${() => String(singleField.touched.value)}</span></div>
                    </div>
                </div>
                <div class="p-4 bg-nix-surface rounded-nix-lg border shadow-nix-sm self-start">
                    <pre class="text-[10px] text-nix-text"><code>import { nixField, validators } from "@deijose/nix-js";

const field = nixField("", [
    validators.required("Required"),
    validators.minLength(5),
]);

Input({ label: "Name", field })</code></pre>
                </div>
            </div>

            <!-- ── nixFieldArray ───────────────────────────────────────── -->
            <h2 class="doc-h2">nixFieldArray()</h2>
            <p class="doc-p">Manages dynamic lists of field groups with <code>append</code>, <code>remove</code>, <code>move</code>, and <code>replace</code> operations.</p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 mb-12">
                <div class="p-6 border rounded-nix-xl bg-nix-bg shadow-nix-md space-y-4">
                    <h4 class="font-bold text-sm text-nix-text">Team Members</h4>
                    ${() => teamMembers.fields.value.map((member: any, i: number) => html`
                        <div class="flex gap-3 items-start p-3 bg-nix-surface rounded-nix-lg border">
                            <div class="flex-1 space-y-3">
                                ${Input({ label: "Name", placeholder: "Member name", field: member.name })}
                                ${Input({ label: "Email", type: "email", placeholder: "member@team.com", field: member.email })}
                            </div>
                            ${Button({
        variant: "ghost",
        size: "sm",
        children: "✕",
        onClick: () => teamMembers.remove(i),
    })}
                        </div>
                    `)}
                    <div class="flex gap-2">
                        ${Button({
        variant: "outline",
        size: "sm",
        children: "+ Add Member",
        onClick: () => teamMembers.append({ name: "", email: "" }),
    })}
                        ${Button({
        variant: "ghost",
        size: "sm",
        children: "Reset",
        onClick: () => teamMembers.reset(),
    })}
                    </div>
                    <div class="text-xs text-nix-text-muted">
                        Count: <span class="font-mono font-bold text-nix-primary">${() => String(teamMembers.length.value)}</span>
                    </div>
                </div>
                <div class="p-4 bg-nix-surface rounded-nix-lg border shadow-nix-sm self-start">
                    <pre class="text-[10px] text-nix-text"><code>import { nixFieldArray, validators } from "@deijose/nix-js";

const members = nixFieldArray(
    [{ name: "", email: "" }],
    {
        name: [validators.required("Required")],
        email: [validators.required(), validators.email()],
    }
);

// Render dynamic list:
members.fields.value.map((m, i) => html\`
    \${Input({ label: "Name", field: m.name })}
    \${Input({ label: "Email", field: m.email })}
    &lt;button @click=\${() => members.remove(i)}&gt;Remove&lt;/button&gt;
\`)

// Operations:
members.append({ name: "", email: "" });
members.remove(0);
members.move(0, 1);
members.replace(0, { name: "New", email: "new@test.com" });
members.reset();</code></pre>
                </div>
            </div>

            <!-- ── Built-in Validators ─────────────────────────────────── -->
            <h2 class="doc-h2">Built-in Validators</h2>
            <p class="doc-p">Import from <code>validators</code> namespace or destructure individually.</p>

            <div class="overflow-x-auto mt-6 mb-12">
                <table class="prop-table">
                    <thead>
                        <tr>
                            <th>Validator</th>
                            <th>Signature</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="prop-name">required</td>
                            <td class="prop-type">required(msg?)</td>
                            <td>Rejects empty, null, undefined, or empty arrays.</td>
                        </tr>
                        <tr>
                            <td class="prop-name">minLength</td>
                            <td class="prop-type">minLength(n, msg?)</td>
                            <td>String must be at least n characters.</td>
                        </tr>
                        <tr>
                            <td class="prop-name">maxLength</td>
                            <td class="prop-type">maxLength(n, msg?)</td>
                            <td>String must be at most n characters.</td>
                        </tr>
                        <tr>
                            <td class="prop-name">email</td>
                            <td class="prop-type">email(msg?)</td>
                            <td>Must match a basic email pattern.</td>
                        </tr>
                        <tr>
                            <td class="prop-name">min</td>
                            <td class="prop-type">min(n, msg?)</td>
                            <td>Number must be >= n.</td>
                        </tr>
                        <tr>
                            <td class="prop-name">max</td>
                            <td class="prop-type">max(n, msg?)</td>
                            <td>Number must be <= n.</td>
                        </tr>
                        <tr>
                            <td class="prop-name">pattern</td>
                            <td class="prop-type">pattern(regex, msg?)</td>
                            <td>String must match the RegExp.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-4 bg-nix-surface rounded-nix-lg border shadow-nix-sm mb-12">
                <h4 class="font-bold text-xs uppercase tracking-widest text-nix-text-muted mb-3">Custom Validators</h4>
                <pre class="text-[10px] text-nix-text"><code>import { createValidator } from "@deijose/nix-js";

const isUrl = createValidator&lt;string&gt;(
    (v) => v && !v.startsWith("http") ? "Must be a URL" : null
);

const form = createForm(
    { website: "" },
    { validators: { website: [required(), isUrl] } }
);</code></pre>
            </div>
        </div>
    `;
}
