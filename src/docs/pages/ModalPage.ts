import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Modal, createModal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function ModalPage(): NixTemplate {
    const modal = createModal();
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Modal</h1>
            <p class="doc-lead">Overlays for critical interactions and disclosures.</p>
            
            ${Usage({
                title: "Usage",
                demo: html`
                    <div class="flex flex-col items-center gap-4">
                        ${Button({ 
                            variant: "primary", 
                            onClick: () => modal.open(),
                            children: "Open Modal"
                        })}
                        
                        ${Modal({
                            open: modal.isOpen,
                            title: "Welcome to Nix-UI",
                            children: html`
                                <div class="space-y-4">
                                    <p class="text-sm text-nix-text-muted">
                                        Modals provide a focused interaction environment. They are accessible and support smooth transitions.
                                    </p>
                                    <div class="p-4 bg-nix-surface rounded-nix-md border border-nix-border">
                                        <p class="text-xs font-mono text-nix-primary">modal.isOpen.value = true</p>
                                    </div>
                                </div>
                            `,
                            footer: html`
                                <div class="flex justify-end gap-3 self-end">
                                    ${Button({ 
                                        variant: "ghost", 
                                        size: "sm", 
                                        onClick: () => modal.close(),
                                        children: "Cancel"
                                    })}
                                    ${Button({ 
                                        variant: "primary", 
                                        size: "sm", 
                                        onClick: () => modal.close(),
                                        children: "Understood"
                                    })}
                                </div>
                            `
                        })}
                    </div>
                `,
                code: `const modal = createModal();

Modal({
    open: modal.isOpen,
    title: "Modal Title",
    children: html\`<p>Content goes here</p>\`,
    footer: html\`<button @click=\${() => modal.close()}>Close</button>\`
})`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                    { name: "open", type: "boolean | Signal<boolean>", default: "required", description: "Controls whether the modal is visible." },
                    { name: "title", type: "string", default: "undefined", description: "Modal title." },
                    { name: "size", type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: "Modal width." },
                    { name: "closeOnBackdrop", type: "boolean", default: "true", description: "Close when clicking outside." },
                    { name: "children", type: "NixUIChildren", default: "required", description: "Main content." },
                    { name: "footer", type: "NixUIChildren", default: "undefined", description: "Footer actions." },
                ])}
        </div>
    `;
}
