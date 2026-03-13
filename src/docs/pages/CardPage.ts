import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/Card";
import { Button } from "../../components/Button";
import { Avatar } from "../../components/Avatar";
import { Badge } from "../../components/Badge";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function CardPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Card</h1>
            <p class="doc-lead">Professional content containers using Nix-UI components.</p>
            
            ${Usage({
                title: "Full Example",
                demo: html`
                    <div class="max-w-sm">
                        ${Card({
                            children: html`
                                ${CardHeader({
                                    children: html`
                                        <div class="flex items-center gap-3">
                                            ${Avatar({ size: "sm", name: "Design Team" })}
                                            <div>
                                                <h3 class="text-sm font-bold">New Project</h3>
                                                <p class="text-xs text-nix-text-muted">Public Repository</p>
                                            </div>
                                        </div>
                                    `
                                })}
                                ${CardBody({
                                    children: html`
                                        <p class="text-sm text-nix-text">Experience the power of reactive components with Nix-UI. Perfectly integrated with Nix.js.</p>
                                        <div class="flex gap-2 mt-4">
                                            ${Badge({ children: "Reactive" })}
                                            ${Badge({ children: "Modern" })}
                                        </div>
                                    `
                                })}
                                ${CardFooter({
                                    class: "flex justify-end gap-2",
                                    children: html`
                                        ${Button({ variant: "ghost", size: "sm", children: "Dismiss" })}
                                        ${Button({ variant: "primary", size: "sm", children: "View Project" })}
                                    `
                                })}
                            `
                        })}
                    </div>
                `,
                code: `Card({
    children: html\`
        <CardHeader>...</CardHeader>
        <CardBody>...</CardBody>
        <CardFooter>...</CardFooter>
    \`
})`
            })}
            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                    { name: "padding", type: "boolean", default: "false", description: "Add automatic padding to children." },
                    { name: "hoverable", type: "boolean", default: "false", description: "Add hover effects." },
                    { name: "class", type: "string", default: "''", description: "Additional CSS classes." },
                    { name: "style", type: "string", default: "''", description: "Inline CSS styles." },
                    { name: "onClick", type: "(e: Event) => void", default: "undefined", description: "Click event handler." },
                    { name: "children", type: "NixUIChildren", default: "required", description: "Card content or sub-components." },
                ])}
        </div>
    `;
}
