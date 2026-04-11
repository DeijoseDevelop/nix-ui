import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import type { NixUIChildren } from "../utils/types";
import { cx } from "../utils/cx";
import { nixRovingTabindex } from "../utils/a11y/index";

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
    /** Accessible label for the tablist */
    label?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

let _tabsId = 0;

export function Tabs(props: TabsProps): NixTemplate {
    const {
        tabs,
        defaultTab,
        variant = "underline",
        class: className,
        style,
        onChange,
        label,
    } = props;

    const instanceId = _tabsId++;
    const tablistId = `nix-tablist-${instanceId}`;

    const activeKey = signal(defaultTab ?? tabs[0]?.key ?? "");

    const setTab = (key: string) => {
        const tab = tabs.find((t) => t.key === key);
        if (tab?.disabled) return;

        activeKey.value = key;
        onChange?.(key);
    };

    const getTabId = (tab: TabItem) => `nix-tab-${instanceId}-${tab.key}`;
    const getPanelId = (tab: TabItem) => `nix-tabpanel-${instanceId}-${tab.key}`;

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
        "flex overflow-x-auto overflow-y-hidden",
        variant === "underline" && "border-b border-nix-border gap-0",
        variant === "pills" && "gap-1 p-1 bg-nix-surface rounded-nix-lg",
        variant === "bordered" && "border-b border-nix-border gap-0",
    );

    setTimeout(() => {
        const listEl = document.getElementById(tablistId);
        if (listEl) {
            const roving = nixRovingTabindex({
                container: listEl,
                itemSelector: "button[role='tab']",
                orientation: "horizontal"
            });
            roving.activate();
        }
    }, 0);

    return html`
        <div class=${cx("w-full", className)} style=${style ?? ""}>
            <div
                id=${tablistId}
                class=${listClass}
                role="tablist"
                aria-label=${label || "Tabs"}
                aria-orientation="horizontal"
            >
                ${tabs.map((tab) => {
        const tabId = getTabId(tab);
        const panelId = getPanelId(tab);
        const isActive = () => activeKey.value === tab.key;

        return html`
                        <button
                            id=${tabId}
                            type="button"
                            role="tab"
                            class=${getTabClass(tab)}
                            disabled=${tab.disabled ?? false}
                            @click=${() => setTab(tab.key)}
                            aria-selected=${() => isActive().toString()}
                            aria-controls=${panelId}
                            aria-labelledby=${tabId}
                            tabindex=${() => isActive() ? "0" : "-1"}
                        >
                            ${tab.label}
                        </button>
                    `;
    })}
            </div>
            ${tabs.map((tab) => {
        const panelId = getPanelId(tab);
        const tabId = getTabId(tab);
        const isActive = () => activeKey.value === tab.key;

        return html`
                    <div
                        id=${panelId}
                        class="pt-4"
                        role="tabpanel"
                        aria-labelledby=${tabId}
                        tabindex="0"
                        show=${isActive}
                    >
                        ${() => isActive() ? tab.content() : ""}
                    </div>
                `;
    })}
        </div>
    `;
}
