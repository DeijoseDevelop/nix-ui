import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: string | NixTemplate;
    class?: string;
    style?: string;
    maxItems?: number;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Breadcrumb(props: BreadcrumbProps): NixTemplate {
    const {
        items,
        separator = "/",
        class: className,
        style,
        maxItems,
    } = props;

    let displayItems = items;
    let collapsed = false;

    if (maxItems && items.length > maxItems && maxItems >= 2) {
        const first = items.slice(0, 1);
        const last = items.slice(-(maxItems - 1));
        displayItems = [...first, { label: "…" }, ...last];
        collapsed = true;
    }

    const sep = html`<span class="text-nix-text-muted/50 mx-1.5 select-none text-xs" aria-hidden="true">${separator}</span>`;

    return html`
        <nav class=${cx("flex items-center flex-wrap text-sm", className)} style=${style ?? ""} aria-label="Breadcrumb">
            <ol class="flex items-center flex-wrap gap-0.5">
                ${displayItems.map((item, i) => {
                    const isLast = i === displayItems.length - 1;
                    const isEllipsis = item.label === "…" && collapsed;

                    const content = isLast || (!item.href && !item.onClick)
                        ? html`<span class=${cx(
                            isLast ? "font-semibold text-nix-text" : "text-nix-text-muted",
                            isEllipsis && "cursor-default",
                        )}>${item.label}</span>`
                        : html`<a
                            href=${item.href ?? "#"}
                            class="text-nix-text-muted hover:text-nix-primary transition-colors duration-200"
                            @click=${(e: Event) => {
                                if (item.onClick) {
                                    e.preventDefault();
                                    item.onClick();
                                }
                            }}
                        >${item.label}</a>`;

                    return html`
                        <li class="inline-flex items-center">
                            ${i > 0 ? sep : ""}
                            ${content}
                        </li>
                    `;
                })}
            </ol>
        </nav>
    `;
}
