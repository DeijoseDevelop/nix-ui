import { html, signal, repeat, portal, transition, NixComponent } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

export interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
    title?: string;
    dismissible?: boolean;
    createdAt: number;
    duration: number;
}

export interface ToastOptions {
    title?: string;
    duration?: number;
    dismissible?: boolean;
    position?: ToastPosition;
}

// ── Global State ───────────────────────────────────────────────────────────────

const toasts = signal<ToastItem[]>([]);
let _nextId = 0;
let _defaultPosition: ToastPosition = "top-right";

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Show a toast notification.
 *
 * @example
 *   showToast("File saved!", "success");
 *   showToast("Something went wrong", "error", { title: "Error", duration: 5000 });
 */
export function showToast(
    message: string,
    type: ToastType = "info",
    options: ToastOptions = {},
): number {
    const {
        title,
        duration = 4000,
        dismissible = true,
    } = options;

    if (options.position) _defaultPosition = options.position;

    const id = _nextId++;
    const item: ToastItem = {
        id,
        message,
        type,
        title,
        dismissible,
        createdAt: Date.now(),
        duration,
    };

    toasts.update((list) => [...list, item]);

    if (duration > 0) {
        setTimeout(() => dismissToast(id), duration);
    }

    return id;
}

/** Dismiss a toast by ID */
export function dismissToast(id: number): void {
    toasts.update((list) => list.filter((t) => t.id !== id));
}

/** Clear all toasts */
export function clearToasts(): void {
    toasts.value = [];
}

/** Configure the default position for toasts */
export function setToastPosition(position: ToastPosition): void {
    _defaultPosition = position;
}

// ── Convenience methods ────────────────────────────────────────────────────────

showToast.success = (message: string, options?: ToastOptions) =>
    showToast(message, "success", options);

showToast.error = (message: string, options?: ToastOptions) =>
    showToast(message, "error", options);

showToast.warning = (message: string, options?: ToastOptions) =>
    showToast(message, "warning", options);

showToast.info = (message: string, options?: ToastOptions) =>
    showToast(message, "info", options);

// ── Style maps ─────────────────────────────────────────────────────────────────

const TYPE_STYLES: Record<ToastType, {
    accent: string;
    iconBg: string;
    iconColor: string;
    iconSvg: string;
    progressColor: string;
}> = {
    success: {
        accent: "border-l-emerald-500",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        progressColor: "bg-emerald-500",
    },
    error: {
        accent: "border-l-rose-500",
        iconBg: "bg-rose-50",
        iconColor: "text-rose-600",
        iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        progressColor: "bg-rose-500",
    },
    warning: {
        accent: "border-l-amber-500",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
        progressColor: "bg-amber-500",
    },
    info: {
        accent: "border-l-blue-500",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        progressColor: "bg-blue-500",
    },
};

const POSITION_CLASSES: Record<ToastPosition, string> = {
    "top-right":     "top-4 right-4 items-end",
    "top-left":      "top-4 left-4 items-start",
    "top-center":    "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right":  "bottom-4 right-4 items-end",
    "bottom-left":   "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

// ── Individual Toast with transition ───────────────────────────────────────────

function ToastCard(t: ToastItem): NixTemplate {
    const styles = TYPE_STYLES[t.type];
    const visible = signal(true);

    // Auto-dismiss: set visible to false so transition plays leave animation
    if (t.duration > 0) {
        const elapsed = Date.now() - t.createdAt;
        const remaining = Math.max(0, t.duration - elapsed);
        setTimeout(() => {
            visible.value = false;
        }, remaining);
    }

    return transition(
        () =>
            visible.value
                ? html`
                    <div
                        class=${cx(
                            "pointer-events-auto w-full rounded-xl bg-white border border-gray-100 border-l-[3px] overflow-hidden",
                            styles.accent,
                        )}
                        style="box-shadow: 0 4px 24px -4px rgba(0,0,0,0.12), 0 8px 16px -8px rgba(0,0,0,0.08);"
                        role="alert"
                        aria-live="assertive"
                    >
                        <div class="flex items-start gap-3 px-4 py-3.5">
                            <!-- Icon with colored background -->
                            <div class=${cx("flex items-center justify-center w-8 h-8 rounded-lg shrink-0", styles.iconBg)}>
                                <svg class=${cx("w-4.5 h-4.5", styles.iconColor)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    ${html`<g>${styles.iconSvg}</g>`}
                                </svg>
                            </div>

                            <!-- Content -->
                            <div class="flex-1 min-w-0 pt-0.5">
                                ${t.title
                                    ? html`<p class="text-[13px] font-semibold text-gray-900 leading-tight">${t.title}</p>`
                                    : ""}
                                <p class=${cx(
                                    "text-[13px] leading-snug",
                                    t.title ? "text-gray-500 mt-0.5" : "text-gray-700 font-medium",
                                )}>
                                    ${t.message}
                                </p>
                            </div>

                            <!-- Close button -->
                            ${t.dismissible
                                ? html`
                                    <button
                                        @click=${() => {
                                            visible.value = false;
                                            setTimeout(() => dismissToast(t.id), 350);
                                        }}
                                        class="shrink-0 p-1 -mr-1 -mt-0.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
                                        aria-label="Close"
                                    >
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                `
                                : ""}
                        </div>

                        <!-- Progress bar -->
                        ${t.duration > 0
                            ? html`
                                  <div class="h-[2px] w-full bg-gray-50">
                                      <div class=${cx("nix-toast-progress-bar h-full rounded-full opacity-80", styles.progressColor)}></div>
                                  </div>
                              `
                            : ""}
                    </div>
                `
                : null,
        {
            name: "toast",
            appear: true,
            onBeforeEnter: (el) => {
                if (t.duration > 0) {
                    const bar = el.querySelector(".nix-toast-progress-bar") as HTMLElement | null;
                    if (bar) {
                        bar.style.animationName = "nix-toast-progress";
                        bar.style.animationTimingFunction = "linear";
                        bar.style.animationFillMode = "forwards";
                        bar.style.animationDuration = `${t.duration}ms`;
                    }
                }
            },
            onAfterLeave: () => {
                // Clean up from the array after animation finishes
                dismissToast(t.id);
            },
        },
    );
}

// ── Toast Container Component ──────────────────────────────────────────────────

export class ToastContainer extends NixComponent {
    render(): NixTemplate {
        // Use portal to render toast container at document.body
        return portal(
            html`
                <div class=${() => cx(
                    "fixed z-[9999] flex flex-col gap-3 max-w-[380px] w-full pointer-events-none",
                    POSITION_CLASSES[_defaultPosition],
                )}>
                    ${() =>
                        repeat(
                            toasts.value,
                            (t) => t.id,
                            (t) => ToastCard(t),
                        )
                    }
                </div>
            `,
        );
    }
}
