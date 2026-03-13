import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AccordionItem {
    key: string;
    title: string;
    content: () => NixUIChildren;
    disabled?: boolean;
}

export interface AccordionProps {
    items: AccordionItem[];
    multiple?: boolean;
    defaultOpen?: string[];
    class?: string;
    style?: string;
    onChange?: (openKeys: string[]) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Accordion(props: AccordionProps): NixTemplate {
    const {
        items,
        multiple = false,
        defaultOpen = [],
        class: className,
        style,
        onChange,
    } = props;

    const openKeys = signal<string[]>(defaultOpen);

    const toggle = (key: string) => {
        openKeys.update((keys) => {
            if (keys.includes(key)) {
                const next = keys.filter((k) => k !== key);
                onChange?.(next);
                return next;
            }
            const next = multiple ? [...keys, key] : [key];
            onChange?.(next);
            return next;
        });
    };

    return html`
        <div
            class=${cx("w-full divide-y divide-nix-border border border-nix-border rounded-nix-lg overflow-hidden", className)}
            style=${style ?? ""}
        >
            ${items.map(
                (item) => html`
                    <div class="bg-nix-bg">
                        <button
                            type="button"
                            class=${cx(
                                "w-full flex items-center justify-between px-5 py-3.5 text-left text-sm font-medium text-nix-text hover:bg-nix-surface transition-colors duration-150 cursor-pointer",
                                item.disabled && "opacity-50 cursor-not-allowed",
                            )}
                            ?disabled=${item.disabled ?? false}
                            @click=${() => !item.disabled && toggle(item.key)}
                            aria-expanded=${() => openKeys.value.includes(item.key).toString()}
                        >
                            <span>${item.title}</span>
                            <svg
                                class=${() => cx(
                                    "w-4 h-4 text-nix-text-muted transition-transform duration-200",
                                    openKeys.value.includes(item.key) && "rotate-180",
                                )}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        ${() =>
                            openKeys.value.includes(item.key)
                                ? html`
                                    <div class="px-5 pb-4 text-sm text-nix-text-muted animate-nix-slide-up">
                                        ${item.content()}
                                    </div>
                                `
                                : ""}
                    </div>
                `,
            )}
        </div>
    `;
}
