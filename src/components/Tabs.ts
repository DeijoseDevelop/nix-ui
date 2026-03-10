import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface TabItem {
    key: string;
    label: string;
    content: () => NixUIChildren;
    disabled?: boolean;
}

export type TabsVariant = "underline" | "pills" | "bordered";

export interface TabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    variant?: TabsVariant;
    class?: string;
    style?: string;
    onChange?: (key: string) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Tabs(props: TabsProps): NixTemplate {
    const {
        tabs,
        defaultTab,
        variant = "underline",
        class: className,
        style,
        onChange,
    } = props;

    const activeKey = signal(defaultTab ?? tabs[0]?.key ?? "");

    const setTab = (key: string) => {
        activeKey.value = key;
        onChange?.(key);
    };

    // Tab button styles by variant
    const getTabClass = (tab: TabItem) => {
        const isActive = () => activeKey.value === tab.key;

        if (variant === "pills") {
            return () => cx(
                "px-3 py-1.5 text-sm font-medium rounded-nix-md transition-all duration-150 cursor-pointer whitespace-nowrap",
                isActive()
                    ? "bg-nix-primary text-nix-text-inverse shadow-nix-sm"
                    : "text-nix-text-muted hover:text-nix-text hover:bg-nix-surface",
                tab.disabled && "opacity-50 cursor-not-allowed",
            );
        }

        if (variant === "bordered") {
            return () => cx(
                "px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap border",
                isActive()
                    ? "border-nix-border border-b-nix-bg bg-nix-bg text-nix-text -mb-px rounded-t-nix-md"
                    : "border-transparent text-nix-text-muted hover:text-nix-text",
                tab.disabled && "opacity-50 cursor-not-allowed",
            );
        }

        // underline (default)
        return () => cx(
            "px-4 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap border-b-2",
            isActive()
                ? "border-nix-primary text-nix-primary"
                : "border-transparent text-nix-text-muted hover:text-nix-text hover:border-nix-border",
            tab.disabled && "opacity-50 cursor-not-allowed",
        );
    };

    const listClass = cx(
        "flex",
        variant === "underline" && "border-b border-nix-border gap-0",
        variant === "pills" && "gap-1 p-1 bg-nix-surface rounded-nix-lg",
        variant === "bordered" && "border-b border-nix-border gap-0",
    );

    return html`
        <div class=${cx("w-full", className)} style=${style ?? ""}>
            <div class=${listClass} role="tablist">
                ${tabs.map(
                    (tab) => html`
                        <button
                            type="button"
                            role="tab"
                            class=${getTabClass(tab)}
                            ?disabled=${tab.disabled ?? false}
                            @click=${() => !tab.disabled && setTab(tab.key)}
                            aria-selected=${() => (activeKey.value === tab.key).toString()}
                        >
                            ${tab.label}
                        </button>
                    `,
                )}
            </div>
            <div class="pt-4" role="tabpanel">
                ${() => {
                    const active = tabs.find((t) => t.key === activeKey.value);
                    return active ? active.content() : "";
                }}
            </div>
        </div>
    `;
}
