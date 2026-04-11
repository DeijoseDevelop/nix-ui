import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

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

let _breadcrumbId = 0;

export function Breadcrumb(props: BreadcrumbProps): NixTemplate {
    const {
        items,
        separator = "/",
        class: className,
        style,
        maxItems,
    } = props;

    const instanceId = _breadcrumbId++;
    const listId = `nix-breadcrumb-list-${instanceId}`;

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
            <ol id=${listId} class="flex items-center flex-wrap gap-0.5">
                ${displayItems.map((item, i) => {
        const isLast = i === displayItems.length - 1;
        const isEllipsis = item.label === "…" && collapsed;

        const content = isEllipsis
            ? html`<span class="text-nix-text-muted cursor-default" aria-label="More pages" role="presentation">${item.label}</span>`
            : isLast
                ? html`<span class="font-semibold text-nix-text" aria-current="page">${item.label}</span>`
                : (!item.href && !item.onClick)
                    ? html`<span class="text-nix-text-muted">${item.label}</span>`
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
