import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Accordion } from "../../components/Accordion";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function AccordionPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Accordion</h1>
            <p class="doc-lead">Collapsible content panels for organized information display.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="max-w-md w-full mx-auto">
                        ${Accordion({
                            items: [
                                { key: "item1", title: "Is it accessible?", content: () => "Yes. It adheres to the WAI-ARIA design pattern." },
                                { key: "item2", title: "Is it styled?", content: () => "Yes. It comes with default styles that match the Nix-UI aesthetic." },
                                { key: "item3", title: "Is it animated?", content: () => "Yes. It uses smooth CSS transitions for expanding and collapsing." },
                            ]
                        })}
                    </div>
                `,
                code: `Accordion({
    items: [
        { key: "1", title: "Title", content: () => "Content" }
    ]
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "items", type: "AccordionItem[]", default: "required", description: "Array of items (key, title, content function)." },
                { name: "multiple", type: "boolean", default: "false", description: "Allow multiple panels to be open at once." },
                { name: "defaultOpen", type: "string[]", default: "[]", description: "Initial open keys." },
                { name: "class", type: "string", default: "''", description: "Custom classes." },
                { name: "onChange", type: "(keys: string[]) => void", default: "undefined", description: "Triggered on toggle." }
            ])}
        </div>
    `;
}
