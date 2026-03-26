import { html, signal } from "@deijose/nix-js";
import { Pagination } from "../../components/Pagination";

export function PaginationPage() {
    const defaultPage = signal(1);
    const complexPage = signal(45);
    
    return html`
        <div class="space-y-6">
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight text-nix-text">Pagination</h1>
                <p class="text-lg text-nix-text-muted">Navigation component for displaying data across multiple pages.</p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Basic Pagination</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-4 items-center">
                    ${Pagination({
                        currentPage: () => defaultPage.value,
                        totalPages: 5,
                        onPageChange: (p) => defaultPage.value = p
                    })}
                    <p class="text-sm text-nix-text-muted">Current Page: <span class="font-semibold text-nix-primary">${() => defaultPage.value}</span></p>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Complex Pagination (Ellipsis)</h2>
                <p class="text-sm text-nix-text-muted">When there are many pages, the component automatically collapses intermediate pages using ellipsis.</p>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-4 items-center overflow-x-auto">
                    ${Pagination({
                        currentPage: () => complexPage.value,
                        totalPages: 100,
                        siblingCount: 1,
                        onPageChange: (p) => complexPage.value = p
                    })}
                    <p class="text-sm text-nix-text-muted">Current Page: <span class="font-semibold text-nix-primary">${() => complexPage.value}</span> of 100</p>
                </div>
            </div>
            
            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Sizes</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex flex-col gap-6 items-center overflow-x-auto">
                    <div class="w-full">
                        <p class="text-sm font-medium mb-2 w-full text-center">Small</p>
                        ${Pagination({ currentPage: 1, totalPages: 3, size: "sm", onPageChange: () => {} })}
                    </div>
                    
                    <div class="w-full">
                        <p class="text-sm font-medium mb-2 w-full text-center">Medium (Default)</p>
                        ${Pagination({ currentPage: 2, totalPages: 3, size: "md", onPageChange: () => {} })}
                    </div>
                    
                    <div class="w-full">
                        <p class="text-sm font-medium mb-2 w-full text-center">Large</p>
                        ${Pagination({ currentPage: 3, totalPages: 3, size: "lg", onPageChange: () => {} })}
                    </div>
                </div>
            </div>
        </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">API Reference</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left border-collapse">
                        <thead class="bg-nix-bg-subtle text-nix-text border-b border-nix-border">
                            <tr>
                                <th class="p-3 font-semibold">Prop</th>
                                <th class="p-3 font-semibold">Type</th>
                                <th class="p-3 font-semibold">Default</th>
                                <th class="p-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-nix-border">
                            <tr><td class="p-3 font-mono text-nix-primary">currentPage</td><td class="p-3">number | () => number</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">The active page.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">totalPages</td><td class="p-3">number | () => number</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Total number of pages.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">onPageChange</td><td class="p-3">(page: number) => void</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Callback fired when a page is selected.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">siblingCount</td><td class="p-3">number</td><td class="p-3">1</td><td class="p-3 flex-1 break-words">Number of pages to show on each side of the active page.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">size</td><td class="p-3">"sm" | "md" | "lg"</td><td class="p-3">"md"</td><td class="p-3 flex-1 break-words">Button size scheme for pagination item.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">class</td><td class="p-3">string</td><td class="p-3">undefined</td><td class="p-3 flex-1 break-words">Custom classes for the wrapper nav element.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
