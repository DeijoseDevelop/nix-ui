import { html, signal } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

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
    } = props;

    const isOpen = signal(false);
    const id = `nix-dropdown-${_dropdownId++}`;
    const focusIndex = signal(-1);

    const close = () => {
        isOpen.value = false;
        focusIndex.value = -1;
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
        if (isOpen.value) focusIndex.value = -1;
    };

    // Close on click outside
    const onDocClick = (e: Event) => {
        const el = document.getElementById(id);
        if (el && !el.contains(e.target as Node)) close();
    };

    const onKeydown = (e: KeyboardEvent) => {
        if (!isOpen.value) {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                isOpen.value = true;
                focusIndex.value = 0;
            }
            return;
        }

        const actionItems = items.filter(item => !item.divider && !item.disabled);

        if (e.key === "Escape") {
            e.preventDefault();
            close();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            focusIndex.value = Math.min(focusIndex.value + 1, actionItems.length - 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            focusIndex.value = Math.max(focusIndex.value - 1, 0);
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const item = actionItems[focusIndex.value];
            if (item?.onClick) {
                item.onClick();
                close();
            }
        }
    };

    return html`
        <div
            id=${id}
            class=${cx("relative inline-block", className)}
            style=${style ?? ""}
            @keydown=${onKeydown}
        >
            <div @click=${toggle} class="cursor-pointer">
                ${trigger}
            </div>

            ${() => {
                if (!isOpen.value) return "";

                // Attach document listener when open
                setTimeout(() => document.addEventListener("click", onDocClick, { once: true }), 0);

                let actionIdx = -1;

                return html`
                    <div
                        class=${cx(
                            "absolute z-[100] py-1 rounded-nix-lg border border-nix-border bg-nix-bg shadow-nix-lg",
                            "animate-nix-fade-in",
                            POSITION_CLASS[position],
                        )}
                        style=${`min-width: ${width};`}
                        role="menu"
                    >
                        ${items.map(item => {
                            if (item.divider) {
                                return html`<div class="border-t border-nix-border my-1"></div>`;
                            }

                            actionIdx++;
                            const idx = actionIdx;

                            return html`
                                <button
                                    type="button"
                                    class=${() => cx(
                                        "w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2",
                                        item.disabled
                                            ? "text-nix-text-muted cursor-not-allowed opacity-50"
                                            : "text-nix-text hover:bg-nix-primary/10 hover:text-nix-primary cursor-pointer",
                                        focusIndex.value === idx && !item.disabled && "bg-nix-primary/10 text-nix-primary",
                                        item.class,
                                    )}
                                    role="menuitem"
                                    disabled=${item.disabled}
                                    @click=${() => {
                                        if (item.disabled) return;
                                        item.onClick?.();
                                        close();
                                    }}
                                    @mouseenter=${() => { focusIndex.value = idx; }}
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
