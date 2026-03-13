import { html, signal, createForm, validators } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { Checkbox } from "../../components/Checkbox";
import { Button } from "../../components/Button";
import { showToast } from "../../components/Toast";

const { required, email, minLength } = validators;

export function FormsPage(): NixTemplate {
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
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        showToast("Form submitted successfully!", "success", { title: "Success" });
        console.log("Form values:", values);
        isSubmitting.value = false;
        form.reset();
    });

    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Live Form Demo</h1>
            <p class="doc-lead">Complex form using the renewed <code>createForm</code> API.</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
