import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { showToast } from "../components/Toast";

export interface UsageProps {
    title?: string;
    description?: string;
    demo: NixTemplate;
    code: string;
}

export function Usage({ title, description, demo, code }: UsageProps): NixTemplate {
    const copyCode = () => {
        navigator.clipboard.writeText(code);
        showToast.success("Code copied to clipboard!");
    };

    return html`
        <div class="mb-12">
            ${title ? html`<h3 class="text-xl font-bold text-nix-text mb-2">${title}</h3>` : ""}
            ${description ? html`<p class="doc-p mb-6">${description}</p>` : ""}
            
            <div class="preview-box">
                ${demo}
            </div>
            <div class="code-box">
                <button class="copy-button" @click=${copyCode}>
                    Copy
                </button>
                <pre><code>${code.trim()}</code></pre>
            </div>
        </div>
    `;
}
