import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Skeleton } from "../../components/Skeleton";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function SkeletonPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Skeleton</h1>
            <p class="doc-lead">Animated placeholders for loading states.</p>
            
            ${Usage({
                title: "Text Lines",
                demo: html`
                    <div class="max-w-sm">
                        ${Skeleton({ variant: "text", count: 3 })}
                    </div>
                `,
                code: `Skeleton({ variant: "text", count: 3 })`
            })}

            ${Usage({
                title: "Variants",
                demo: html`
                    <div class="flex items-start gap-6">
                        ${Skeleton({ variant: "circular", width: "4rem", height: "4rem" })}
                        <div class="space-y-3 flex-1">
                            ${Skeleton({ variant: "text", width: "60%" })}
                            ${Skeleton({ variant: "text" })}
                            ${Skeleton({ variant: "rectangular", height: "6rem" })}
                        </div>
                    </div>
                `,
                code: `Skeleton({ variant: "circular", width: "4rem", height: "4rem" })
Skeleton({ variant: "text", width: "60%" })
Skeleton({ variant: "rectangular", height: "6rem" })`
            })}

            ${Usage({
                title: "Card Loading State",
                demo: html`
                    <div class="max-w-xs p-4 border rounded-nix-xl bg-nix-bg shadow-nix-sm space-y-4">
                        ${Skeleton({ variant: "rectangular", height: "8rem" })}
                        ${Skeleton({ variant: "text", width: "70%" })}
                        ${Skeleton({ variant: "text", count: 2 })}
                        <div class="flex gap-2 pt-2">
                            ${Skeleton({ variant: "rectangular", width: "5rem", height: "2rem" })}
                            ${Skeleton({ variant: "rectangular", width: "5rem", height: "2rem" })}
                        </div>
                    </div>
                `,
                code: `<div class="p-4 border rounded-nix-xl">
    \${Skeleton({ variant: "rectangular", height: "8rem" })}
    \${Skeleton({ variant: "text", width: "70%" })}
    \${Skeleton({ variant: "text", count: 2 })}
</div>`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "variant", type: "'text' | 'circular' | 'rectangular'", default: "'text'", description: "Shape style." },
                { name: "width", type: "string", default: "auto", description: "CSS width." },
                { name: "height", type: "string", default: "auto", description: "CSS height." },
                { name: "count", type: "number", default: "1", description: "Number of elements to repeat." },
            ])}
        </div>
    `;
}
