import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

export interface PaginationProps {
    currentPage: number | (() => number);
    totalPages: number | (() => number);
    siblingCount?: number;
    showControls?: boolean;
    onPageChange: (page: number) => void;
    class?: string;
    size?: "sm" | "md" | "lg";
    /** Accessible label for the pagination nav */
    label?: string;
}

export function Pagination(props: PaginationProps): NixTemplate {
    const {
        currentPage,
        totalPages,
        siblingCount = 1,
        showControls = true,
        onPageChange,
        class: className,
        size = "md",
        label = "Pagination",
    } = props;

    const current = (): number => (typeof currentPage === "function" ? currentPage() : currentPage);
    const total = (): number => (typeof totalPages === "function" ? totalPages() : totalPages);

    const generatePages = (): (number | string)[] => {
        const c = current();
        const t = total();
        const sc = siblingCount;
        const totalPageNumbers = sc * 2 + 5;

        if (totalPageNumbers >= t) {
            return Array.from({ length: t }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(c - sc, 1);
        const rightSiblingIndex = Math.min(c + sc, t);

        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < t - 1;

        if (!showLeftDots && showRightDots) {
            const leftItemCount = 3 + 2 * sc;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, "...", t];
        }

        if (showLeftDots && !showRightDots) {
            const rightItemCount = 3 + 2 * sc;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => t - rightItemCount + i + 1);
            return [1, "...", ...rightRange];
        }

        if (showLeftDots && showRightDots) {
            const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [1, "...", ...middleRange, "...", t];
        }

        return [];
    };

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
        sm: "h-8 min-w-[32px] px-2 text-xs",
        md: "h-10 min-w-[40px] px-3 text-sm",
        lg: "h-12 min-w-[48px] px-4 text-base",
    };

    const btnBaseClass = "cursor-pointer inline-flex items-center justify-center rounded-nix-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-nix-primary focus:ring-offset-2 select-none";

    return html`
        <nav role="navigation" aria-label=${label} class=${cx("flex flex-wrap items-center justify-center gap-2 w-full", className)}>
            ${showControls ? html`
                <button
                    class=${() => cx(
        btnBaseClass,
        sizeClasses[size],
        "text-nix-text hover:bg-nix-primary/10",
        current() === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
    )}
                    aria-label="Previous Page"
                    disabled=${() => current() === 1}
                    @click=${() => { if (current() > 1) onPageChange(current() - 1); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    <span class="sr-only">Previous</span>
                </button>
            ` : ""}

            <div class="flex flex-wrap items-center justify-center gap-1">
                ${() => generatePages().map((page) => {
        if (page === "...") {
            return html`
                            <span class=${cx("flex items-center justify-center text-nix-text-muted tracking-widest", sizeClasses[size])} aria-hidden="true">
                                &hellip;
                            </span>
                        `;
        }

        const pageNum = page as number;
        const isCurrent = pageNum === current();

        return html`
                        <button
                            class=${cx(
            btnBaseClass,
            sizeClasses[size],
            isCurrent
                ? "bg-nix-primary text-white shadow-md hover:bg-nix-primary-hover"
                : "bg-transparent text-nix-text hover:bg-nix-primary/10 border border-transparent hover:border-nix-primary/20"
        )}
                            aria-current=${isCurrent ? "page" : "false"}
                            @click=${() => {
                if (!isCurrent) onPageChange(pageNum);
            }}
                        >
                            ${pageNum}
                        </button>
                    `;
    })}
            </div>

            ${showControls ? html`
                <button
                    class=${() => cx(
        btnBaseClass,
        sizeClasses[size],
        "text-nix-text hover:bg-nix-primary/10",
        current() === total() ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
    )}
                    aria-label="Next Page"
                    disabled=${() => current() === total()}
                    @click=${() => { if (current() < total()) onPageChange(current() + 1); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="sr-only">Next</span>
                </button>
            ` : ""}
        </nav>
    `;
}
