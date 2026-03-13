import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Badge } from "../../components/Badge";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function BadgePage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Badge</h1>
            <p class="doc-lead">Compact elements for status and categories.</p>
            
            ${Usage({
                title: "Variants",
                demo: html`
                    <div class="flex flex-wrap gap-2">
                        ${Badge({ children: "Default" })}
                        ${Badge({ variant: "success", children: "Success" })}
                        ${Badge({ variant: "warning", children: "Warning" })}
                        ${Badge({ variant: "error", children: "Error" })}
                        ${Badge({ variant: "info", children: "Info" })}
                    </div>
                `,
                code: `<div class="flex flex-wrap gap-2">
                    \${Badge({ children: "Default" })}
                    \${Badge({ variant: "success", children: "Success" })}
                    \${Badge({ variant: "warning", children: "Warning" })}
                    \${Badge({ variant: "error", children: "Error" })}
                    \${Badge({ variant: "info", children: "Info" })}
                </div>`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                    { name: "variant", type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: "Visual style." },
                    { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "The badge scale." },
                    { name: "pill", type: "boolean", default: "false", description: "Round corners fully." },
                    { name: "dot", type: "boolean", default: "false", description: "Show a small indicator dot." },
                    { name: "class", type: "string", default: "''", description: "Additional CSS classes." },
                    { name: "style", type: "string", default: "''", description: "Inline CSS styles." },
                    { name: "children", type: "NixUIChildren", default: "required", description: "Badge content." },
                ])}
        </div>
    `;
}
