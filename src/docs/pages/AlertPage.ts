import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Alert } from "../../components/Alert";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function AlertPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in shadow-nix-sm p-4 bg-nix-bg rounded-nix-lg">
            <h1 class="doc-h1">Alert</h1>
            <p class="doc-lead">Important messages with semantic colors and animations.</p>
            
            ${Usage({
                title: "Dismissible Alerts",
                description: "Alerts can be closed with a smooth fade-out animation.",
                demo: html`
                    <div class="w-full space-y-3">
                        ${Alert({ 
                            variant: "info", 
                            dismissible: true,
                            title: "Update Available", 
                            children: "A new version of Nix-UI is ready to install." 
                        })}
                        ${Alert({ 
                            variant: "warning", 
                            dismissible: true,
                            children: "Your account is low on credits. Please refill soon." 
                        })}
                    </div>
                `,
                code: `Alert({ dismissible: true, children: "Dismiss me!" })`
            })}

            ${Usage({
                title: "Variants",
                demo: html`
                    <div class="w-full space-y-3">
                        ${Alert({ variant: "success", title: "Success", children: "Action completed successfully." })}
                        ${Alert({ variant: "error", title: "Error", children: "Internal server error. Please try again." })}
                    </div>
                `,
                code: `Alert({ variant: "success", title: "Success" })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "variant", type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: "Visual style." },
                { name: "dismissible", type: "boolean", default: "false", description: "Show close button." },
                { name: "onDismiss", type: "() => void", default: "undefined", description: "Close callback." }
            ])}
        </div>
    `;
}
