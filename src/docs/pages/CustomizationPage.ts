import { html } from "@deijose/nix-js";

export function CustomizationPage() {
    return html`
        <div class="space-y-6">
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight text-nix-text">Styling & Customization</h1>
                <p class="text-lg text-nix-text-muted">
                    Learn how to customize Nix UI components using CSS Variables or Tailwind CSS utilities.
                </p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Global CSS Variables</h2>
                <p class="text-nix-text">
                    Nix UI is built with a flexible design system powered by CSS variables. You can override these variables globally in your <code>styles.css</code> to completely change the look and feel of your app.
                </p>
                <div class="bg-nix-bg-subtle p-4 rounded-nix-md border border-nix-border text-sm overflow-x-auto">
                    <pre><code class="text-nix-text-muted">/* Global Customization Example */
:root {
  /* Change the primary color to a deep purple */
  --nix-primary: #7c3aed; /* Tailwind violet-600 */
  --nix-primary-hover: #6d28d9; /* Tailwind violet-700 */

  /* Make components more rounded */
  --nix-radius-sm: 0.5rem;
  --nix-radius-md: 0.75rem;
  --nix-radius-lg: 1rem;
}

/* Dark mode overrides */
.dark {
  --nix-bg: #0f172a;
  --nix-bg-subtle: #1e293b;
  --nix-border: #334155;
  --nix-text: #f8fafc;
  --nix-text-muted: #94a3b8;
}</code></pre>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Tailwind Utility Classes (Props)</h2>
                <p class="text-nix-text">
                    For local overrides, every Nix UI component accepts a <code>class</code> prop that intelligently merges with the base styles using <code>tailwind-merge</code>. You can use any Tailwind utility class to customize spacing, colors, or typography on a per-instance basis.
                </p>
                
                <h3 class="text-lg font-medium mt-4">Example: Local Button Customization</h3>
                <p class="text-sm text-nix-text-muted">Here we pass a custom background gradient and shadow to a standard Button.</p>
                
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex gap-4 items-center justify-center">
                    <button class="inline-flex items-center justify-center rounded-nix-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-nix-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 text-white hover:opacity-90 bg-gradient-to-r from-pink-500 to-orange-400 shadow-lg shadow-pink-500/30">
                        Gradient Button
                    </button>
                    <button class="inline-flex items-center justify-center rounded-nix-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-nix-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 shadow-sm !border-2 !border-dashed !border-nix-primary text-nix-primary bg-transparent hover:bg-nix-primary/10">
                        Dashed Outline
                    </button>
                </div>

                <div class="bg-nix-bg-subtle p-4 rounded-nix-md border border-nix-border text-sm overflow-x-auto mt-4">
                    <pre><code class="text-nix-text-muted">import { Button } from "@deijose/nix-ui";

// Inside your component:
Button({ 
  children: "Gradient Button",
  class: "bg-gradient-to-r from-pink-500 to-orange-400 shadow-lg shadow-pink-500/30 text-white" 
})

Button({ 
  children: "Dashed Outline",
  variant: "outline",
  class: "!border-2 !border-dashed !border-nix-primary" 
})</code></pre>
                </div>
            </div>
            
            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Important Note on Specificity</h2>
                <p class="text-nix-text">
                    Nix UI uses a smart <code>cx()</code> utility that automatically resolves Tailwind conflicts.
                    However, if your custom framework environment processes CSS differently, you may need to use the Tailwind <code>!</code> important modifier (like <code>!bg-red-500</code>) to force an override over default component styles.
                </p>
            </div>
        </div>
    `;
}
