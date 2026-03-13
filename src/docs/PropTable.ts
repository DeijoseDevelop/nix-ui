import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";

export interface PropItem {
    name: string;
    type: string;
    description: string;
    default?: string;
}

export function PropTable(props: PropItem[]): NixTemplate {
    return html`
        <table class="prop-table">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${props.map(p => html`
                    <tr>
                        <td class="prop-name">${p.name}</td>
                        <td class="prop-type">${p.type}</td>
                        <td class="text-xs font-mono text-nix-text-muted">${p.default || "-"}</td>
                        <td>${p.description}</td>
                    </tr>
                `)}
            </tbody>
        </table>
    `;
}
