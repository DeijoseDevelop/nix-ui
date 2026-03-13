import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";

export function Installation(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Installation</h1>
            <p class="doc-lead">Get up and running with Nix-UI in seconds.</p>
            
            <h2 class="doc-h2">Using npm</h2>
            <div class="code-box rounded-nix-lg overflow-hidden my-6">
                <pre><code>npm install @deijose/nix-ui @deijose/nix-js</code></pre>
            </div>
            
            <h2 class="doc-h2">Setup Styles</h2>
            <p class="doc-p">Import the base styles in your main entry file:</p>
            <div class="code-box rounded-nix-lg overflow-hidden my-6">
                <pre><code>import "@deijose/nix-ui/dist/style.css";</code></pre>
            </div>
        </div>
    `;
}
