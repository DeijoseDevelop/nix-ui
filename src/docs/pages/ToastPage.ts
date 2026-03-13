import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { showToast } from "../../components/Toast";
import { Button } from "../../components/Button";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function ToastPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Toast</h1>
            <p class="doc-lead">Temporary notifications that appear at the edge of the screen.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="flex flex-wrap gap-3">
                        ${Button({ 
                            variant: "primary", 
                            onClick: () => showToast("Your profile has been updated.", "success", { title: "Success!" }),
                            children: "Success Toast"
                        })}
                        ${Button({ 
                            variant: "danger", 
                            onClick: () => showToast("Something went wrong. Please try again.", "error", { title: "Error" }),
                            children: "Error Toast"
                        })}
                        ${Button({ 
                            variant: "secondary", 
                            onClick: () => showToast("A new version is available.", "info", { title: "Update" }),
                            children: "Info Toast"
                        })}
                    </div>
                `,
                code: `showToast({ 
    title: "Success", 
    description: "...", 
    variant: "success" 
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "title", type: "string", default: "required", description: "Brief heading." },
                { name: "description", type: "string", default: "undefined", description: "Detailed message." },
                { name: "variant", type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: "Semantic style." },
                { name: "duration", type: "number", default: "3000", description: "Time before hiding (ms)." }
            ])}
        </div>
    `;
}
