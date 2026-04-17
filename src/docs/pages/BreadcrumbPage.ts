import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function BreadcrumbPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">
                Breadcrumb
            </h1>
            <p class="doc-lead">
                Navigation breadcrumbs to show the current location in a hierarchy.
            </p>

            ${Usage({
                title: "Basic Usage",
                demo: html`
                    <div class="space-y-4">
                        ${Breadcrumb({
                            items: [
                                { label: "Home", href: "#" },
                                { label: "Products", href: "#" },
                                { label: "Electronics" },
                            ]
                        })}
                    </div>
                `,
                code: `Breadcrumb({
                                items: [
                                    { label: "Home", href: "/" },
                                    { label: "Products", href: "/products" },
                                    { label: "Electronics" },
                                ]
                            })`
            })}

            ${Usage({
                title: "Custom Separator",
                demo: html`
                    <div class="space-y-4">
                        ${Breadcrumb({
                            items: [
                                { label: "Dashboard", href: "#" },
                                { label: "Settings", href: "#" },
                                { label: "Profile" },
                            ],
                            separator: "›"
                        })}
                        ${Breadcrumb({
                            items: [
                                { label: "Home", href: "#" },
                                { label: "Users", href: "#" },
                                { label: "Edit" },
                            ],
                            separator: "→"
                        })}
                    </div>
                `,
                code: `Breadcrumb({ items: [...], separator: "›" })`
            })}

            ${Usage({
                title: "Collapsed (maxItems)",
                demo: Breadcrumb({
                    items: [
                        { label: "Home", href: "#" },
                        { label: "Category", href: "#" },
                        { label: "Subcategory", href: "#" },
                        { label: "Section", href: "#" },
                        { label: "Current Page" },
                    ],
                    maxItems: 3,
                }),
                code: `Breadcrumb({ items: [...5 items], maxItems: 3 })`
            })}

            <h2 class="doc-h2">
                API Reference
            </h2>
            ${PropTable([
                {
                    name: "items",
                    type: "BreadcrumbItem[]",
                    default: "required",
                    description: "Array of { label, href?, onClick? }."
                },
                {
                    name: "separator",
                    type: "string | NixTemplate",
                    default: "'/'",
                    description: "Separator between items."
                },
                {
                    name: "maxItems",
                    type: "number",
                    default: "undefined",
                    description: "Collapse middle items with '…' when exceeded."
                }
            ])}
        </div>
    `;
}
