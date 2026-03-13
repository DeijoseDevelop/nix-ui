import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Button } from "../../components/Button";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function ButtonPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Button</h1>
            <p class="doc-lead">Interactive buttons for actions and navigation.</p>
            
            ${Usage({
                title: "Variants",
                description: "A set of variations for different semantic actions.",
                demo: html`
                    <div class="flex flex-wrap gap-2">
                        ${Button({ variant: "primary", children: "Primary" })}
                        ${Button({ variant: "secondary", children: "Secondary" })}
                        ${Button({ variant: "outline", children: "Outline" })}
                        ${Button({ variant: "ghost", children: "Ghost" })}
                        ${Button({ variant: "danger", children: "Danger" })}
                    </div>
                `,
                code: `Button({ variant: "primary", children: "Button" })`
            })}

            ${Usage({
                title: "Sizes",
                description: "Three standard sizes to fit any layout requirement.",
                demo: html`
                    <div class="flex flex-wrap items-center gap-4">
                        ${Button({ size: "sm", children: "Small" })}
                        ${Button({ size: "md", children: "Medium" })}
                        ${Button({ size: "lg", children: "Large" })}
                    </div>
                `,
                code: `Button({ size: "lg", children: "Action" })`
            })}

            ${Usage({
                title: "States",
                description: "Buttons support loading and disabled states.",
                demo: html`
                    <div class="flex flex-wrap gap-4">
                        ${Button({ loading: true, children: "Processing" })}
                        ${Button({ disabled: true, children: "Disabled" })}
                        ${Button({ variant: "danger", loading: true, children: "Deleting..." })}
                    </div>
                `,
                code: `Button({ loading: true, children: "Submit" })`
            })}
            
            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", default: "'primary'", description: "The visual style of the button." },
                { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "The button scale." },
                { name: "loading", type: "boolean | Signal<boolean>", default: "false", description: "Shows a spinner and disables the button." },
                { name: "disabled", type: "boolean | Signal<boolean>", default: "false", description: "Disables interaction." },
                { name: "onClick", type: "(e: Event) => void", default: "undefined", description: "Click event handler." }
            ])}
        </div>
    `;
}
