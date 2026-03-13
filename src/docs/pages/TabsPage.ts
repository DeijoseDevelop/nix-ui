import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Tabs } from "../../components/Tabs";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function TabsPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Tabs</h1>
            <p class="doc-lead">Switch between different views or functional sections.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="w-full">
                        ${Tabs({
                            tabs: [
                                { key: "account", label: "Account", content: () => html`<div class="p-4 border border-nix-border rounded-b-nix-md bg-nix-surface">Account settings and profile information.</div>` },
                                { key: "password", label: "Password", content: () => html`<div class="p-4 border border-nix-border rounded-b-nix-md bg-nix-surface">Change your password and security settings.</div>` },
                                { key: "settings", label: "Settings", content: () => html`<div class="p-4 border border-nix-border rounded-b-nix-md bg-nix-surface">General application preferences.</div>` },
                            ]
                        })}
                    </div>
                `,
                code: `Tabs({
    items: [
        { key: "1", label: "Tab 1", content: () => "Content" }
    ]
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "items", type: "TabItem[]", default: "required", description: "Array of items (key, label, content function)." },
                { name: "defaultKey", type: "string", default: "first key", description: "Initial active tab." },
                { name: "onChange", type: "(key: string) => void", default: "undefined", description: "Triggered on switch." }
            ])}
        </div>
    `;
}
