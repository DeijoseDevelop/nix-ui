import { html, signal, computed } from "@deijose/nix-js";
import type { Signal, NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DataTableColumn<T = Record<string, unknown>> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: T, index: number) => NixTemplate | string;
    width?: string;
    align?: "left" | "center" | "right";
}

export interface DataTableProps<T = Record<string, unknown>> {
    columns: DataTableColumn<T>[];
    data: T[] | Signal<T[]>;
    pageSize?: number;
    searchable?: boolean;
    searchPlaceholder?: string;
    striped?: boolean;
    hoverable?: boolean;
    bordered?: boolean;
    compact?: boolean;
    emptyMessage?: string;
    class?: string;
    style?: string;
    stickyHeader?: boolean;
    pageSizeOptions?: number[];
    /** Accessible label for the table */
    caption?: string;
}

type SortDir = "asc" | "desc" | null;

// ── Component ──────────────────────────────────────────────────────────────────

let _tableId = 0;

export function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>): NixTemplate {
    const {
        columns,
        data,
        pageSize: initialPageSize = 10,
        searchable = true,
        searchPlaceholder = "Search...",
        striped = true,
        hoverable = true,
        bordered = false,
        compact = false,
        emptyMessage = "No data available.",
        class: className,
        style,
        stickyHeader = false,
        pageSizeOptions = [5, 10, 25, 50],
        caption,
    } = props;

    const instanceId = _tableId++;
    const tableId = `nix-datatable-${instanceId}`;
    const searchId = `nix-datatable-search-${instanceId}`;
    const statusId = `nix-datatable-status-${instanceId}`;

    const search = signal("");
    const sortKey = signal<string | null>(null);
    const sortDir = signal<SortDir>(null);
    const currentPage = signal(0);
    const pageSize = signal(initialPageSize);

    const resolveData = (): T[] => {
        const raw = typeof data === "object" && "value" in data ? (data as Signal<T[]>).value : data as T[];
        return raw;
    };

    const filtered = computed(() => {
        let rows = resolveData();
        const q = search.value.toLowerCase().trim();
        if (q) {
            rows = rows.filter(row =>
                columns.some(col => {
                    const val = row[col.key];
                    return val != null && String(val).toLowerCase().includes(q);
                })
            );
        }
        return rows;
    });

    const sorted = computed(() => {
        const rows = [...filtered.value];
        const key = sortKey.value;
        const dir = sortDir.value;
        if (!key || !dir) return rows;

        return rows.sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            let cmp: number;
            if (typeof aVal === "number" && typeof bVal === "number") {
                cmp = aVal - bVal;
            } else {
                cmp = String(aVal).localeCompare(String(bVal));
            }
            return dir === "desc" ? -cmp : cmp;
        });
    });

    const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize.value)));

    const paged = computed(() => {
        const start = currentPage.value * pageSize.value;
        return sorted.value.slice(start, start + pageSize.value);
    });

    const toggleSort = (key: string) => {
        if (sortKey.value === key) {
            if (sortDir.value === "asc") sortDir.value = "desc";
            else if (sortDir.value === "desc") { sortKey.value = null; sortDir.value = null; }
            else sortDir.value = "asc";
        } else {
            sortKey.value = key;
            sortDir.value = "asc";
        }
        currentPage.value = 0;
    };

    const cellPad = compact ? "px-3 py-1.5 text-xs" : "px-4 py-3 text-sm";

    const sortIcon = (key: string) => {
        return () => {
            if (sortKey.value !== key) return html`<span class="text-nix-text-muted/40 ml-1">⇅</span>`;
            return html`<span class="text-nix-primary ml-1 font-bold">${sortDir.value === "asc" ? "↑" : "↓"}</span>`;
        };
    };

    const getSortLabel = (key: string) => {
        return () => {
            if (sortKey.value !== key) return "Sortable";
            return sortDir.value === "asc" ? "Sorted ascending" : sortDir.value === "desc" ? "Sorted descending" : "Sortable";
        };
    };

    return html`
        <div class=${cx("w-full", className)} style=${style ?? ""}>
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4" role="toolbar" aria-label="Table controls">
                ${searchable ? html`
                    <div class="relative w-full sm:max-w-xs">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nix-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <input
                            id=${searchId}
                            type="text"
                            placeholder=${searchPlaceholder}
                            class="w-full pl-9 pr-3 py-2 text-sm border border-nix-border rounded-nix-md bg-nix-bg text-nix-text placeholder:text-nix-text-muted focus:outline-none focus:ring-2 focus:ring-nix-primary/30 focus:border-nix-primary transition-all"
                            @input=${(e: Event) => { search.value = (e.target as HTMLInputElement).value; currentPage.value = 0; }}
                        />
                    </div>
                ` : ""}
                <div class="flex items-center gap-2 text-xs text-nix-text-muted shrink-0">
                    <span>Rows:</span>
                    <select
                        class="border border-nix-border rounded-nix-sm bg-nix-bg text-nix-text text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nix-primary/30"
                        @change=${(e: Event) => { pageSize.value = Number((e.target as HTMLSelectElement).value); currentPage.value = 0; }}
                    >
                        ${pageSizeOptions.map(s => html`
                            <option value=${String(s)} ?selected=${s === initialPageSize}>${String(s)}</option>
                        `)}
                    </select>
                    <span>${() => {
            const total = sorted.value.length;
            const start = currentPage.value * pageSize.value + 1;
            const end = Math.min(start + pageSize.value - 1, total);
            return total > 0 ? `${start}–${end} of ${total}` : "0 results";
        }}</span>
                </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto rounded-nix-lg border border-nix-border shadow-nix-sm">
                <table
                    id=${tableId}
                    class="w-full border-collapse"
                    aria-rowcount=${() => sorted.value.length}
                    aria-colcount=${columns.length}
                >
                    ${caption ? html`<caption class="sr-only">${caption}</caption>` : ""}
                    <thead>
                        <tr class=${cx("bg-nix-surface/80 border-b border-nix-border", stickyHeader && "sticky top-0 z-10")}>
                            ${columns.map(col => html`
                                <th
                                    class=${cx(
            cellPad,
            "text-left font-semibold text-nix-text-muted uppercase tracking-wider whitespace-nowrap select-none",
            col.sortable !== false && "cursor-pointer hover:text-nix-primary transition-colors",
            col.align === "center" && "text-center",
            col.align === "right" && "text-right",
        )}
                                    style=${col.width ? `width:${col.width}` : undefined}
                                    @click=${col.sortable !== false ? () => toggleSort(col.key) : undefined}
                                    aria-sort=${() => {
                if (sortKey.value !== col.key) return "none";
                return sortDir.value === "asc" ? "ascending" : sortDir.value === "desc" ? "descending" : "none";
            }}
                                >
                                    ${col.label}${col.sortable !== false ? sortIcon(col.key) : ""}
                                    <span class="sr-only">${getSortLabel(col.key)}</span>
                                </th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${() => {
            const rows = paged.value;
            if (rows.length === 0) {
                return html`
                                    <tr>
                                        <td colspan=${String(columns.length)} class="text-center py-12 text-nix-text-muted text-sm" role="alert">
                                            ${emptyMessage}
                                        </td>
                                    </tr>
                                `;
            }
            return rows.map((row, i) => {
                const globalIdx = currentPage.value * pageSize.value + i;
                return html`
                                    <tr aria-rowindex=${() => globalIdx + 1} class=${cx(
                    "border-b border-nix-border/50 transition-colors",
                    striped && i % 2 === 1 && "bg-nix-surface/40",
                    hoverable && "hover:bg-nix-primary/5",
                    bordered && "border-x border-nix-border",
                )}>
                                        ${columns.map(col => html`
                                            <td class=${cx(
                    cellPad,
                    "text-nix-text",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                )}>
                                                ${col.render
                        ? col.render(row[col.key], row, globalIdx)
                        : String(row[col.key] ?? "")}
                                            </td>
                                        `)}
                                    </tr>
                                `;
            });
        }}
                    </tbody>
                </table>
            </div>

            <!-- Live status region for screen readers -->
            <div id=${statusId} class="sr-only" role="status" aria-live="polite">
                ${() => {
            const total = sorted.value.length;
            const start = currentPage.value * pageSize.value + 1;
            const end = Math.min(start + pageSize.value - 1, total);
            return total > 0 ? `Showing ${start} to ${end} of ${total} rows` : "No rows";
        }}
            </div>

            <!-- Pagination -->
            ${() => {
            const pages = totalPages.value;
            if (pages <= 1) return "";
            return html`
                    <nav class="flex items-center justify-center gap-1 mt-4" role="navigation" aria-label="Table pagination">
                        <button
                            class="px-2.5 py-1.5 text-xs rounded-nix-sm border border-nix-border text-nix-text hover:bg-nix-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled=${() => currentPage.value === 0}
                            @click=${() => currentPage.value = Math.max(0, currentPage.value - 1)}
                        >‹</button>
                        ${() => {
                    const page = currentPage.value;
                    const total = totalPages.value;
                    const maxVisible = 5;
                    let start = Math.max(0, page - Math.floor(maxVisible / 2));
                    const end = Math.min(total, start + maxVisible);
                    if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

                    const buttons = [];
                    for (let p = start; p < end; p++) {
                        buttons.push(html`
                                    <button
                                        class=${cx(
                            "px-2.5 py-1.5 text-xs rounded-nix-sm border transition-colors",
                            p === page
                                ? "bg-nix-primary text-white border-nix-primary shadow-nix-sm"
                                : "border-nix-border text-nix-text hover:bg-nix-surface"
                        )}
                                        @click=${() => currentPage.value = p}
                                        aria-label=${`Page ${p + 1}`}
                                        aria-current=${p === page ? "page" : undefined}
                                    >${String(p + 1)}</button>
                                `);
                    }
                    return buttons;
                }}
                        <button
                            class="px-2.5 py-1.5 text-xs rounded-nix-sm border border-nix-border text-nix-text hover:bg-nix-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled=${() => currentPage.value >= totalPages.value - 1}
                            @click=${() => currentPage.value = Math.min(totalPages.value - 1, currentPage.value + 1)}
                        >›</button>
                    </nav>
                `;
        }}
        </div>
    `;
}
