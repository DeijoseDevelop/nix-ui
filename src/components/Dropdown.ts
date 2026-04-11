import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";
import { nixRovingTabindex } from "../utils/a11y/index";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DropdownItem {
    label: string;
    icon?: string;
    onClick?: () => void;
    disabled?: boolean;
    divider?: boolean;
    class?: string;
}

export type DropdownPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";

export interface DropdownProps {
    trigger: NixTemplate;
    items: DropdownItem[];
    position?: DropdownPosition;
    class?: string;
    style?: string;
    width?: string;
    /** Accessible label for the dropdown trigger */
    label?: string;
}

// ── Position maps ──────────────────────────────────────────────────────────────

const POSITION_CLASS: Record<DropdownPosition, string> = {
    "bottom-left": "top-full left-0 mt-1",
    "bottom-right": "top-full right-0 mt-1",
    "top-left": "bottom-full left-0 mb-1",
    "top-right": "bottom-full right-0 mb-1",
};

// ── Component ──────────────────────────────────────────────────────────────────

let _dropdownId = 0;

export function Dropdown(props: DropdownProps): NixTemplate {
    const {
        trigger,
        items,
        position = "bottom-left",
        class: className,
        style,
        width = "12rem",
        label,
    } = props;

    const instanceId = _dropdownId++;
    const dropdownId = `nix-dropdown-menu-${instanceId}`;
    const triggerId = `nix-dropdown-trigger-${instanceId}`;

    const isOpen = signal(false);
    let roving: ReturnType<typeof nixRovingTabindex> | null = null;

    const close = () => {
        isOpen.value = false;
        if (roving) {
            roving.deactivate();
            roving = null;
        }
        document.getElementById(triggerId)?.focus();
    };

    const toggle = () => {
        if (isOpen.value) {
            close();
        } else {
            isOpen.value = true;
            setTimeout(() => {
                const el = document.getElementById(dropdownId);
                if (el) {
                    roving = nixRovingTabindex({
                        container: el,
                        itemSelector: "button[role='menuitem']:not([disabled])",
                        orientation: "vertical"
                    });
                    roving.activate();
                    roving.focusFirst();
                }
            }, 0);
        }
    };

    // Close on click outside
    const onDocClick = (e: Event) => {
        const el = document.getElementById(`nix-dropdown-${instanceId}`);
        if (el && !el.contains(e.target as Node)) close();
    };

    const onTriggerKeydown = (e: KeyboardEvent) => {
        if (!isOpen.value) {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            close();
        }
    };

    return html`
        <div
            id=${`nix-dropdown-${instanceId}`}
            class=${cx("relative inline-block", className)}
            style=${style ?? ""}
        >
            <div
                @click=${toggle}
                @keydown=${onTriggerKeydown}
                class="cursor-pointer"
                id=${triggerId}
                role="button"
                tabindex="0"
                aria-haspopup="true"
                aria-expanded=${() => isOpen.value.toString()}
                aria-controls=${dropdownId}
            >
                ${trigger}
            </div>

            ${() => {
            if (!isOpen.value) return "";

            // Attach document listener when open
            setTimeout(() => document.addEventListener("click", onDocClick, { once: true }), 0);

            return html`
                    <div
                        id=${dropdownId}
                        class=${cx(
                "absolute z-[100] py-1 rounded-nix-lg border border-nix-border bg-nix-bg shadow-nix-lg",
                "animate-nix-fade-in",
                POSITION_CLASS[position],
            )}
                        style=${`min-width: ${width};`}
                        role="menu"
                        aria-labelledby=${triggerId}
                        @keydown=${(e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    e.preventDefault();
                    close();
                }
            }}
                    >
                        ${label ? html`<div class="sr-only" id=${`${dropdownId}-label`}>${label}</div>` : ""}
                        ${items.map(item => {
                if (item.divider) {
                    return html`<div class="border-t border-nix-border my-1" role="separator"></div>`;
                }

                return html`
                                <button
                                    type="button"
                                    class=${() => cx(
                    "w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2",
                    item.disabled
                        ? "text-nix-text-muted cursor-not-allowed opacity-50"
                        : "text-nix-text hover:bg-nix-primary/10 hover:text-nix-primary focus:bg-nix-primary/10 focus:text-nix-primary focus:outline-none cursor-pointer",
                    item.class,
                )}
                                    role="menuitem"
                                    tabindex="-1"
                                    disabled=${item.disabled}
                                    @click=${() => {
                        if (item.disabled) return;
                        item.onClick?.();
                        close();
                    }}
                                >
                                    ${item.icon ? html`<span class="text-base">${item.icon}</span>` : ""}
                                    ${item.label}
                                </button>
                            `;
            })}
                    </div>
                `;
        }}
        </div>
    `;
}
