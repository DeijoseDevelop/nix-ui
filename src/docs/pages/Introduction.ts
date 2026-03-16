import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";

export function Introduction(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <div class="flex items-center gap-3 mb-4">
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-nix-primary/10 text-nix-primary rounded-full border border-nix-primary/20">v1.2.2</span>
            </div>
            <h1 class="doc-h1">Introduction</h1>
            <p class="doc-lead">A beautiful, reactive component library built for Nix.js.</p>
            <p class="doc-p">Nix-UI provides a set of accessible, reusable, and composable components that work out of the box with the Nix.js reactivity system. Built with Tailwind CSS, it offers a professional aesthetic while staying extremely lightweight.</p>
            
            <h2 class="doc-h2">Core Principles</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div class="p-6 border border-nix-border rounded-nix-lg bg-nix-bg shadow-nix-sm hover:shadow-nix-md transition-shadow">
                    <h3 class="font-bold text-nix-primary mb-2">Reactive by Design</h3>
                    <p class="text-sm text-nix-text-muted">Components are deeply integrated with Nix.js signals, ensuring efficient updates without virtual DOM overhead.</p>
                </div>
                <div class="p-6 border border-nix-border rounded-nix-lg bg-nix-bg shadow-nix-sm hover:shadow-nix-md transition-shadow">
                    <h3 class="font-bold text-nix-primary mb-2">Modern Aesthetic</h3>
                    <p class="text-sm text-nix-text-muted">Clean, professional, and customizable styles using vanilla CSS tokens and Tailwind utility classes.</p>
                </div>
            </div>
        </div>
    `;
}
