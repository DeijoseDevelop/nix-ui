import { html, mount, createForm, validators, signal, computed } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import "./styles/base.css";

import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Textarea } from "./components/Textarea";
import { Select } from "./components/Select";
import { Checkbox } from "./components/Checkbox";
import { Toggle } from "./components/Toggle";
import { Badge } from "./components/Badge";
import { Card, CardHeader, CardBody, CardFooter } from "./components/Card";
import { Modal, createModal } from "./components/Modal";
import { Spinner } from "./components/Spinner";
import { Alert } from "./components/Alert";
import { Avatar } from "./components/Avatar";
import { Tooltip } from "./components/Tooltip";
import { Tabs } from "./components/Tabs";
import { Accordion } from "./components/Accordion";
import { ToastContainer, showToast } from "./components/Toast";

// ── Helper ─────────────────────────────────────────────────────────────────────

function Section(title: string, children: NixTemplate): NixTemplate {
    return html`
        <section class="mb-10">
            <h2 class="text-xl font-bold text-nix-text mb-4 pb-2 border-b border-nix-border">${title}</h2>
            <div class="space-y-4">
                ${children}
            </div>
        </section>
    `;
}

// ── App ────────────────────────────────────────────────────────────────────────

function App(): NixTemplate {
    const modal = createModal();

    // --- Demo Form ---
    const form = createForm({
        username: "",
        email: "",
        bio: "",
        country: "",
        agreeTerms: false,
        newsletter: true,
    }, {
        validators: {
            username: [validators.required("Username is required")],
            email: [
                (v: unknown) => {
                    if (typeof v !== 'string' || !v) return "Email is required";
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Invalid email pattern";
                    return null;
                }
            ],
            bio: [validators.maxLength(100, "Bio max 100 chars")],
            country: [validators.required("Please select your country")],
            agreeTerms: [(v: unknown) => v ? null : "You must agree to the terms"],
        }
    });

    const isSubmitting = signal(false);

    const onSubmit = form.handleSubmit(async (values) => {
        isSubmitting.value = true;
        console.log("Form Submitted:", values);
        await new Promise(r => setTimeout(r, 1000)); // fake delay
        
        showToast.success("Profile saved successfully!", { title: "Success" });
        isSubmitting.value = false;
    });

    const f = form.fields;

    return html`
        <main class="min-h-screen bg-nix-surface pb-16">
            <!-- Hero Section -->
            <div class="bg-nix-bg border-b border-nix-border px-8 py-16 mb-12 shadow-sm relative overflow-hidden">
                <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNHYtMmgtNHpNNiAzNHYtNEg0djRIMGYyaDR2NGgydi00aDR2LTJINnpNNiA0VjBINFY0SDB2Mmg0djRoMlY2aDRWNEg2eiIvPjwvZz48L2c+PC9zdmc+')"></div>
                <div class="max-w-4xl mx-auto relative z-10 text-center">
                    <span class="inline-block py-1 px-3 rounded-nix-full bg-nix-primary/10 text-nix-primary text-sm font-semibold mb-4 border border-nix-primary/20">
                        v1.1.0 Ready
                    </span>
                    <h1 class="text-5xl font-extrabold text-nix-text mb-4 tracking-tight">
                        ❄️ Nix UI
                    </h1>
                    <p class="text-xl text-nix-text-muted max-w-2xl mx-auto leading-relaxed">
                        A beautiful, reactive component library for <strong class="text-nix-text font-semibold">Nix.js</strong>. 
                        Built with Tailwind CSS, fully accessible, and deeply integrated with reactive signals.
                    </p>
                    <div class="mt-8 flex justify-center gap-4">
                        ${Button({
                            variant: "primary",
                            size: "lg",
                            children: "Get Started",
                            onClick: () => {
                                window.location.href = "https://www.npmjs.com/package/@deijose/nix-ui";
                            },
                        })}
                        ${Button({
                            variant: "outline",
                            size: "lg",
                            children: "GitHub Repo",
                            onClick: () => {
                                window.open("https://github.com/DeijoseDevelop/nix-js", "_blank");
                            },
                        })}
                    </div>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-6">

                <!-- Buttons -->
                ${Section("Button", html`
                    <div class="flex flex-wrap gap-3 items-center">
                        ${Button({ variant: "primary", children: "Primary" })}
                        ${Button({ variant: "secondary", children: "Secondary" })}
                        ${Button({ variant: "outline", children: "Outline" })}
                        ${Button({ variant: "ghost", children: "Ghost" })}
                        ${Button({ variant: "danger", children: "Danger" })}
                        ${Button({ variant: "primary", loading: true, children: "Loading..." })}
                    </div>
                    <div class="flex flex-wrap gap-3 items-center">
                        ${Button({ variant: "primary", size: "sm", children: "Small" })}
                        ${Button({ variant: "primary", size: "md", children: "Medium" })}
                        ${Button({ variant: "primary", size: "lg", children: "Large" })}
                        ${Button({ variant: "primary", disabled: true, children: "Disabled" })}
                    </div>
                `)}

                <!-- Input -->
                ${Section("Input", html`
                    <div class="grid grid-cols-2 gap-4">
                        ${Input({ label: "Email", type: "email", placeholder: "you@example.com" })}
                        ${Input({ label: "Password", type: "password", placeholder: "••••••••" })}
                        ${Input({ label: "With error", value: "bad", error: "This field is invalid" })}
                        ${Input({ label: "Disabled", disabled: true, value: "Cannot edit" })}
                    </div>
                `)}

                <!-- Textarea -->
                ${Section("Textarea", html`
                    <div class="grid grid-cols-2 gap-4">
                        ${Textarea({ label: "Comment", placeholder: "Write your thoughts..." })}
                        ${Textarea({ label: "With error", error: "Required field", value: "" })}
                    </div>
                `)}

                <!-- Select -->
                ${Section("Select", html`
                    <div class="max-w-xs">
                        ${Select({
                            label: "Country",
                            placeholder: "Pick a country",
                            options: [
                                { value: "co", label: "🇨🇴 Colombia" },
                                { value: "mx", label: "🇲🇽 México" },
                                { value: "ar", label: "🇦🇷 Argentina" },
                                { value: "us", label: "🇺🇸 United States" },
                            ],
                        })}
                    </div>
                `)}

                <!-- Checkbox & Toggle -->
                ${Section("Checkbox & Toggle", html`
                    <div class="flex flex-wrap gap-6 items-center">
                        ${Checkbox({ label: "Accept terms", checked: true })}
                        ${Checkbox({ label: "Subscribe to newsletter" })}
                        ${Checkbox({ label: "Disabled", disabled: true })}
                    </div>
                    <div class="flex flex-wrap gap-6 items-center">
                        ${Toggle({ label: "Dark mode", checked: false })}
                        ${Toggle({ label: "Notifications", checked: true })}
                        ${Toggle({ label: "Disabled", disabled: true })}
                    </div>
                `)}

                <!-- Badge -->
                ${Section("Badge", html`
                    <div class="flex flex-wrap gap-2 items-center">
                        ${Badge({ children: "Default" })}
                        ${Badge({ variant: "success", children: "Active" })}
                        ${Badge({ variant: "warning", children: "Pending" })}
                        ${Badge({ variant: "error", children: "Failed" })}
                        ${Badge({ variant: "info", children: "New" })}
                    </div>
                    <div class="flex flex-wrap gap-2 items-center">
                        ${Badge({ variant: "success", pill: true, dot: true, children: "Online" })}
                        ${Badge({ variant: "error", pill: true, dot: true, children: "Offline" })}
                        ${Badge({ variant: "info", size: "sm", children: "Small" })}
                        ${Badge({ variant: "info", size: "lg", children: "Large" })}
                    </div>
                `)}

                <!-- Card -->
                ${Section("Card", html`
                    <div class="max-w-md">
                        ${Card({
                            children: html`
                                ${CardHeader({ children: html`<h3 class="font-semibold text-nix-text">Card Title</h3>` })}
                                ${CardBody({ children: html`<p class="text-sm text-nix-text-muted">This is the card body content. You can put anything inside.</p>` })}
                                ${CardFooter({ children: html`
                                    <div class="flex gap-2">
                                        ${Button({ variant: "primary", size: "sm", children: "Save" })}
                                        ${Button({ variant: "ghost", size: "sm", children: "Cancel" })}
                                    </div>
                                ` })}
                            `,
                        })}
                    </div>
                `)}

                <!-- Spinner -->
                ${Section("Spinner", html`
                    <div class="flex flex-wrap gap-6 items-center">
                        ${Spinner({ size: "sm", label: "Small" })}
                        ${Spinner({ size: "md", label: "Loading..." })}
                        ${Spinner({ size: "lg" })}
                        ${Spinner({ variant: "dots", size: "md" })}
                        ${Spinner({ variant: "pulse", size: "md" })}
                    </div>
                `)}

                <!-- Alert -->
                ${Section("Alert", html`
                    <div class="space-y-3">
                        ${Alert({ variant: "info", title: "Heads up!", children: "This is an informational alert." })}
                        ${Alert({ variant: "success", children: "Your changes have been saved successfully." })}
                        ${Alert({ variant: "warning", title: "Warning", dismissible: true, children: "You are about to lose unsaved changes." })}
                        ${Alert({ variant: "error", dismissible: true, children: "Something went completely wrong." })}
                    </div>
                `)}

                <!-- Avatar -->
                ${Section("Avatar", html`
                    <div class="flex flex-wrap gap-4 items-center">
                        ${Avatar({ name: "John Doe", size: "xs" })}
                        ${Avatar({ name: "Alice Smith", size: "sm", status: "online" })}
                        ${Avatar({ name: "Bob Wilson", size: "md", status: "busy" })}
                        ${Avatar({ name: "Carlos García", size: "lg", status: "away" })}
                        ${Avatar({ size: "xl", status: "offline" })}
                    </div>
                `)}

                <!-- Tooltip -->
                ${Section("Tooltip", html`
                    <div class="flex flex-wrap gap-4 items-center">
                        ${Tooltip({ text: "I'm on top!", position: "top", children: Button({ variant: "outline", size: "sm", children: "Top" }) })}
                        ${Tooltip({ text: "I'm on the right!", position: "right", children: Button({ variant: "outline", size: "sm", children: "Right" }) })}
                        ${Tooltip({ text: "I'm at the bottom!", position: "bottom", children: Button({ variant: "outline", size: "sm", children: "Bottom" }) })}
                        ${Tooltip({ text: "I'm on the left!", position: "left", children: Button({ variant: "outline", size: "sm", children: "Left" }) })}
                    </div>
                `)}

                <!-- Tabs -->
                ${Section("Tabs", html`
                    <div class="space-y-6">
                        ${Tabs({
                            variant: "underline",
                            tabs: [
                                { key: "tab1", label: "Overview", content: () => html`<p class="text-sm text-nix-text-muted">This is the overview tab content.</p>` },
                                { key: "tab2", label: "Features", content: () => html`<p class="text-sm text-nix-text-muted">Features tab content goes here.</p>` },
                                { key: "tab3", label: "Pricing", content: () => html`<p class="text-sm text-nix-text-muted">Pricing information shown here.</p>` },
                            ],
                        })}
                        ${Tabs({
                            variant: "pills",
                            tabs: [
                                { key: "p1", label: "All", content: () => html`<p class="text-sm text-nix-text-muted">Showing all items.</p>` },
                                { key: "p2", label: "Active", content: () => html`<p class="text-sm text-nix-text-muted">Showing active items.</p>` },
                                { key: "p3", label: "Archived", content: () => html`<p class="text-sm text-nix-text-muted">Showing archived items.</p>` },
                            ],
                        })}
                    </div>
                `)}

                <!-- Accordion -->
                ${Section("Accordion", html`
                    ${Accordion({
                        items: [
                            { key: "a1", title: "What is Nix UI?", content: () => html`<p>Nix UI is a component library built for Nix.js with Tailwind CSS and vanilla CSS support.</p>` },
                            { key: "a2", title: "How do I customize styles?", content: () => html`<p>Every component accepts <code class="bg-nix-surface px-1 rounded text-xs">class</code> and <code class="bg-nix-surface px-1 rounded text-xs">style</code> props for adding Tailwind or vanilla CSS.</p>` },
                            { key: "a3", title: "Is it compatible with dark mode?", content: () => html`<p>Yes! Override the CSS custom properties defined in <code class="bg-nix-surface px-1 rounded text-xs">base.css</code> for dark mode support.</p>` },
                        ],
                        defaultOpen: ["a1"],
                    })}
                `)}

                <!-- Toasts -->
                ${Section("Toasts", html`
                    <p class="text-sm text-nix-text-muted mb-4">Click the buttons below to trigger toast notifications.</p>
                    <div class="flex flex-wrap gap-3 items-center">
                        ${Button({ 
                            variant: "outline", 
                            onClick: () => showToast.info("System update available", { title: "Heads up!" }),
                            children: "Info Toast" 
                        })}
                        ${Button({ 
                            variant: "primary", 
                            onClick: () => showToast.success("Profile saved successfully!", { title: "Success" }),
                            children: "Success Toast" 
                        })}
                        ${Button({ 
                            variant: "danger", 
                            onClick: () => showToast.error("Failed to connect to the server.", { title: "Error" }),
                            children: "Error Toast" 
                        })}
                        ${Button({ 
                            variant: "ghost", 
                            onClick: () => showToast.warning("Your session will expire in 5 minutes.", { title: "Warning" }),
                            children: "Warning Toast" 
                        })}
                    </div>
                `)}

                <!-- Modal -->
                ${Section("Modal", html`
                    ${Button({
                        variant: "primary",
                        onClick: () => modal.open(),
                        children: "Open Modal",
                    })}
                    ${Modal({
                        open: modal.isOpen,
                        title: "Example Modal",
                        onClose: () => modal.close(),
                        children: html`<p class="text-sm text-nix-text-muted">This is a modal dialog. Click the X or backdrop to close it.</p>`,
                        footer: html`
                            ${Button({ variant: "ghost", size: "sm", onClick: () => modal.close(), children: "Cancel" })}
                            ${Button({ variant: "primary", size: "sm", onClick: () => modal.close(), children: "Confirm" })}
                        `,
                    })}
                `)}

                <!-- Forms Integration -->
                ${Section("Forms Integration", html`
                    <form @submit=${onSubmit} class="p-6 border border-nix-border rounded-nix-lg bg-nix-bg shadow-sm max-w-md space-y-4">
                        <h3 class="text-lg font-bold text-nix-text mb-2">Edit Profile (Real-world Form)</h3>
                        
                        ${Input({ 
                            label: "Username", 
                            placeholder: "cooluser99", 
                            field: f.username 
                        })}
                        
                        ${Input({ 
                            label: "Email", 
                            type: "email", 
                            placeholder: "you@example.com", 
                            field: f.email 
                        })}
                        
                        ${Textarea({ 
                            label: "Bio", 
                            placeholder: "Tell us about yourself...", 
                            field: f.bio 
                        })}
                        
                        ${Select({
                            label: "Country",
                            placeholder: "Select a country...",
                            options: [
                                { value: "co", label: "🇨🇴 Colombia" },
                                { value: "mx", label: "🇲🇽 México" },
                                { value: "ar", label: "🇦🇷 Argentina" },
                                { value: "us", label: "🇺🇸 United States" },
                                { value: "other", label: "🌍 Other" },
                            ],
                            field: f.country
                        })}
                        
                        <div class="pt-2 border-t border-nix-border/50">
                            ${Toggle({ 
                                label: "Subscribe to Newsletter", 
                                field: f.newsletter 
                            })}
                        </div>
                        
                        <div class="pt-2">
                            ${Checkbox({ 
                                label: "I agree to the Terms of Service", 
                                field: f.agreeTerms 
                            })}
                        </div>
                        
                        <div class="pt-4 flex gap-3">
                            ${Button({ 
                                variant: "primary", 
                                type: "submit", 
                                loading: isSubmitting,
                                disabled: computed(() => !form.valid.value),
                                children: "Save Profile"
                            })}
                            ${Button({ 
                                variant: "ghost", 
                                type: "button", 
                                onClick: () => form.reset(),
                                disabled: isSubmitting,
                                children: "Reset"
                            })}
                        </div>
                    </form>
                `)}
            </div>
        </main>

        <!-- Toast container renders globally -->
        ${new ToastContainer().render()}
    `;
}

mount(App(), "#app");