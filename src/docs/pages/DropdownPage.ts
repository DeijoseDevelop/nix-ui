import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Dropdown } from "../../components/Dropdown";
import { Button } from "../../components/Button";
import { showToast } from "../../components/Toast";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function DropdownPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Dropdown</h1>
            <p class="doc-lead">Action menus triggered by a button or any element.</p>
            
            ${Usage({
                title: "Basic Dropdown",
                demo: html`
                    <div class="flex gap-4">
                        ${Dropdown({
                            trigger: Button({ variant: "outline", children: "Actions ▾" }),
                            items: [
                                { label: "Edit", icon: "✏️", onClick: () => showToast.info("Edit clicked") },
                                { label: "Duplicate", icon: "📋", onClick: () => showToast.info("Duplicate clicked") },
                                { label: "Archive", icon: "📦", onClick: () => showToast.info("Archive clicked") },
                                { divider: true, label: "" },
                                { label: "Delete", icon: "🗑️", onClick: () => showToast("Item deleted", "error"), class: "text-red-500 hover:!text-red-600" },
                            ]
                        })}
                    </div>
                `,
                code: `Dropdown({
    trigger: Button({ variant: "outline", children: "Actions ▾" }),
    items: [
        { label: "Edit", icon: "✏️", onClick: () => {} },
        { label: "Duplicate", icon: "📋", onClick: () => {} },
        { divider: true },
        { label: "Delete", icon: "🗑️" },
    ]
})`
            })}

            ${Usage({
                title: "Position & Disabled Items",
                demo: html`
                    <div class="flex gap-4">
                        ${Dropdown({
                            trigger: Button({ variant: "primary", size: "sm", children: "Bottom-Left ▾" }),
                            position: "bottom-left",
                            items: [
                                { label: "Option A", onClick: () => showToast.success("A") },
                                { label: "Option B", onClick: () => showToast.success("B") },
                                { label: "Disabled", disabled: true },
                            ]
                        })}
                        ${Dropdown({
                            trigger: Button({ variant: "primary", size: "sm", children: "Bottom-Right ▾" }),
                            position: "bottom-right",
                            items: [
                                { label: "Profile", icon: "👤" },
                                { label: "Settings", icon: "⚙️" },
                                { divider: true, label: "" },
                                { label: "Sign out", icon: "🚪" },
                            ]
                        })}
                    </div>
                `,
                code: `Dropdown({
    trigger: Button({ children: "Menu ▾" }),
    position: "bottom-right",
    items: [
        { label: "Profile", icon: "👤" },
        { label: "Disabled", disabled: true },
    ]
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "trigger", type: "NixTemplate", default: "required", description: "Element that opens the dropdown." },
                { name: "items", type: "DropdownItem[]", default: "required", description: "Array of { label, icon?, onClick?, disabled?, divider? }." },
                { name: "position", type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'", default: "'bottom-left'", description: "Menu position." },
                { name: "width", type: "string", default: "'12rem'", description: "Minimum menu width." },
            ])}
        </div>
    `;
}
